import express from 'express';
import db from '../config/db.js'; // Ajuste o caminho para o seu arquivo de configuração do banco de dados

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
      d.nome AS disciplina_nome, 
      d.descricao AS disciplina_descricao, 
      (SELECT COUNT(*) FROM aulas WHERE aluno_id = ?) AS aulas_participadas,
      (SELECT COUNT(*) FROM aulas WHERE aluno_id = ? AND status = 'em andamento') AS aulas_em_andamento
    FROM usuarios u
    LEFT JOIN disciplinas d ON d.monitor_id = u.id
    WHERE u.id = ?
  `, [alunoId, alunoId, alunoId], (err, results) => {
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

export default router;
