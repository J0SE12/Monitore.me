import express from 'express';
import pkg from 'body-parser';
import bancoRouter from './banco.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import pool from './banco.mjs';
import criarSalaRoute from './criarSala.mjs'; // Importe a rota de criação de sala
import cadastrarAssuntoRoute from './cadastrarAssunto.mjs'; // Importe a rota de criação de assunto
import alunoRoutes from './alunoRoutes'

const { json } = pkg;

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretório público onde os arquivos HTML estão localizados
const publicDirectory = path.join(__dirname, 'public');

app.use(json());

// Serve a página de login como a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectory, 'login.html'));
});

// Serve a página de cadastro de usuários
app.get('/inscricao', (req, res) => {
  res.sendFile(path.join(publicDirectory, 'inscricao.html'));
});

// Serve arquivos estáticos (como CSS e JS)
app.use(express.static(publicDirectory));

// Adiciona as rotas importadas
app.use('/api', criarSalaRoute);
app.use('/api', cadastrarAssuntoRoute);
app.use('/api', bancoRouter);

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

// Rota para criar uma nova sala de aula
app.post('/api/criar-sala', async (req, res) => {
  const { nome, capacidade, localizacao, horarios } = req.body;

  try {
    // Iniciar uma transação
    await pool.query('START TRANSACTION');

    // Inserir a nova sala de aula
    const [result] = await pool.query(
      'INSERT INTO salas_de_aula (nome, capacidade, localizacao) VALUES (?, ?, ?)',
      [nome, capacidade, localizacao]
    );

    const salaId = result.insertId; // Obter o ID da sala recém-criada

    // Inserir os horários disponíveis para essa sala
    for (const horario of horarios) {
      const { dia_da_semana, hora_inicio, hora_fim } = horario;
      await pool.query(
        'INSERT INTO horarios_disponiveis (sala_de_aula_id, dia_da_semana, hora_inicio, hora_fim) VALUES (?, ?, ?, ?)',
        [salaId, dia_da_semana, hora_inicio, hora_fim]
      );
    }

    // Confirmar a transação
    await pool.query('COMMIT');

    res.status(200).json({ success: true, message: 'Sala de aula e horários criados com sucesso' });
  } catch (error) {
    // Reverter a transação em caso de erro
    await pool.query('ROLLBACK');
    console.error('Erro ao criar sala de aula:', error);
    res.status(500).json({ success: false, message: 'Erro ao criar sala de aula' });
  }
});

// Rota para cadastrar um novo assunto
app.post('/api/cadastrar-assunto', async (req, res) => {
  const { nome, descricao, monitor_id } = req.body;

  try {
    await pool.query(
      'INSERT INTO disciplinas (nome, descricao, monitor_id) VALUES (?, ?, ?)',
      [nome, descricao, monitor_id]
    );

    res.status(200).json({ success: true, message: 'Assunto cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar assunto:', error);
    res.status(500).json({ success: false, message: 'Erro ao cadastrar assunto' });
  }
});

app.use(express.json());
app.use('/api/aluno', alunoRoutes); // Adiciona o prefixo da rota



// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
