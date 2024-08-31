// banco.mjs
import mysql from 'mysql2/promise';
import { Router } from 'express';

// Configurações do banco de dados
const pool = mysql.createPool({
  host: 'localhost',  // Substitua pelo seu host
  user: 'Jose',       // Substitua pelo seu nome de usuário
  password: 'teka5751', // Substitua pela sua senha
  database: 'monitore' // Substitua pelo nome do seu banco de dados
});

// Configuração das rotas
const router = Router();

// Exemplo de rota de teste
router.get('/example', (req, res) => {
  res.send('This is an example route');
});

// Rota para criar uma nova sala de aula
router.post('/criar-sala', async (req, res) => {
  const { nome, capacidade, localizacao, horarios } = req.body;

  try {
    // Inserir a sala de aula no banco de dados
    const [result] = await pool.query(
      'INSERT INTO salas_de_aula (nome, capacidade, localizacao) VALUES (?, ?, ?)',
      [nome, capacidade, localizacao]
    );

    const salaId = result.insertId;

    // Inserir os horários disponíveis para a sala de aula
    if (horarios && Array.isArray(horarios)) {
      for (const horario of horarios) {
        await pool.query(
          'INSERT INTO horarios_disponiveis (sala_de_aula_id, dia_da_semana, hora_inicio, hora_fim) VALUES (?, ?, ?, ?)',
          [salaId, horario.dia_da_semana, horario.hora_inicio, horario.hora_fim]
        );
      }
    }

    res.status(200).json({ success: true, message: 'Sala de aula criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar sala de aula:', error);
    res.status(500).json({ success: false, message: 'Erro ao criar sala de aula' });
  }
});

// Rota para criar um novo assunto
router.post('/criar-assunto', async (req, res) => {
  const { nome, descricao, monitor_id } = req.body;

  try {
    // Inserir o assunto no banco de dados
    await pool.query(
      'INSERT INTO disciplinas (nome, descricao, monitor_id) VALUES (?, ?, ?)',
      [nome, descricao, monitor_id]
    );

    res.status(200).json({ success: true, message: 'Assunto criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar assunto:', error);
    res.status(500).json({ success: false, message: 'Erro ao criar assunto' });
  }
});

// Rota para obter disciplinas disponíveis
router.get('/disciplinas', async (req, res) => {
  try {
    const [disciplinas] = await pool.query('SELECT * FROM disciplinas');

    res.json(disciplinas);
  } catch (error) {
    console.error('Erro ao obter disciplinas:', error);
    res.status(500).json({ message: 'Erro ao obter disciplinas.' });
  }
});



// Exporta o router para ser utilizado em outros arquivos
export default router;
