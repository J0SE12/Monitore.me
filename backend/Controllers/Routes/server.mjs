import express from 'express';
import pkg from 'body-parser';
import bancoRoute from './banco.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenha o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { json } = pkg;

const app = express();
const port = 3000;

app.use(json());

// Serve a página de login como a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Sirva arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota de login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Substitua isso pela lógica real de autenticação
  if (username === 'admin' && password === 'password') {
    res.status(200).json({ message: 'Login bem-sucedido' });
  } else {
    res.status(401).json({ message: 'Usuário ou senha incorretos' });
  }
});

// Utilize a rota importada
app.use('/api', bancoRoute);

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
