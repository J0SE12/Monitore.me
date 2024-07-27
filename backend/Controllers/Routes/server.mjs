import express from 'express';
import pkg from 'body-parser';
import bancoRoute from './banco.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import pool from './banco.mjs'; // Importa o pool de conexões

const { json } = pkg;

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(json());

// Serve a página de login como a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve a página de cadastro de usuários
app.get('/inscricao', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'inscricao.html'));
});

// Sirva arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const usuario = rows[0];

    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro na comunicação com o banco de dados' });
  }
});

// Rota para criar um novo usuário
app.post('/api/create-user', async (req, res) => {
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

    res.status(200).json({ success: true, message: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ success: false, message: 'Erro ao criar o usuário' });
  }
});

// Utilize a rota importada
app.use('/api', bancoRoute);

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
