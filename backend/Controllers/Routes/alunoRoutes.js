import express from 'express';
import pool from './banco.mjs';

const router = express.Router();

// Rota para obter as informações do perfil do aluno
router.get('/perfil', (req, res) => {
  const alunoId = req.query.id; // Assumindo que o ID do aluno é passado como parâmetro de consulta

  if (!alunoId) {
    return res.status(400).json({ error: 'ID do aluno não fornecido.' });
  }

  // Obter detalhes do aluno e status
  db.query(`
    SELECT 
      u.id AS aluno_id, 
      u.nome AS aluno_nome, 
      COUNT(d.id_dsc) AS total_disciplinas,
      SUM(CASE WHEN a.status = 'em andamento' THEN 1 ELSE 0 END) AS aulas_em_andamento,
      (SELECT COUNT(*) FROM disciplinas d2 WHERE d2.monitor_id = u.id) AS total_disciplinas_oferecidas
    FROM usuarios u
    LEFT JOIN disciplinas d ON d.monitor_id = u.id
    LEFT JOIN aulas a ON a.aluno_id = u.id
    WHERE u.id = ?
    GROUP BY u.id
  `, [alunoId], (err, results) => {
    if (err) {
      console.error('Erro ao obter dados do aluno:', err);
      return res.status(500).json({ error: 'Erro ao obter dados do aluno.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    const alunoData = results[0];
    res.json(alunoData);
  });
});

// Rota para listar as aulas que o aluno participou ou está participando
router.get('/aulas', (req, res) => {
  const alunoId = req.query.id; // Assumindo que o ID do aluno é passado como parâmetro de consulta

  if (!alunoId) {
    return res.status(400).json({ error: 'ID do aluno não fornecido.' });
  }

  db.query(`
    SELECT 
      a.id AS aula_id,
      d.nome AS disciplina_nome,
      s.nome AS sala_nome,
      h.dia_da_semana,
      h.hora_inicio,
      h.hora_fim,
      a.status
    FROM aulas a
    JOIN disciplinas d ON a.disciplina_id = d.id_dsc
    JOIN salas_de_aula s ON a.sala_id = s.id_sala
    JOIN horarios_disponiveis h ON a.horario_id = h.id_hor
    WHERE a.aluno_id = ?
  `, [alunoId], (err, results) => {
    if (err) {
      console.error('Erro ao obter aulas do aluno:', err);
      return res.status(500).json({ error: 'Erro ao obter aulas do aluno.' });
    }

    res.json(results);
  });
});

export default router;
