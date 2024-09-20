import express from 'express';
import pool from './banco.mjs';

const router = express.Router();

// Rota para avaliar o monitor
router.post('/avaliar-monitor', async (req, res) => {
  const { monitorId, feedback } = req.body;

  if (!monitorId || !feedback) {
    return res.status(400).json({ message: 'ID do monitor e feedback são obrigatórios.' });
  }

  try {
    await pool.query(
      'INSERT INTO avaliacao_monitores (monitor_id, feedback) VALUES (?, ?)',
      [monitorId, feedback]
    );

    res.status(200).json({ message: 'Avaliação enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao avaliar monitor:', error);
    res.status(500).json({ message: 'Erro ao avaliar monitor.' });
  }
});

export default router;
