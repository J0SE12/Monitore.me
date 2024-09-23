import express from 'express';
import bcrypt from 'bcrypt';
import pool from './banco.mjs'

const router = express.Router();

// Rota para criar um novo usuário
router.post('/create-user', async (req, res) => {
  const { nome, email, senha, papel } = req.body;

  try {
    // Verifique se o usuário já existe
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Usuário já existe' });
    }

    // Crie um novo usuário
    const senhaHash = await bcrypt.hash(senha, 10);
    await pool.query('INSERT INTO usuarios (nome, email, senha, papel) VALUES (?, ?, ?, ?)', [nome, email, senhaHash, papel]);

    res.status(201).json({ success: true, message: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ success: false, message: 'Erro ao criar o usuário' });
  }

  try {
    const [rows, fields] = await pool.query('SELECT 1');
    console.log('Conexão bem-sucedida!', rows);
} catch (error) {
    console.error('Erro ao conectar ao banco:', error);
}

});

export default router;
