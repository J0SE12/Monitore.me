// Importar a biblioteca necessária para a conexão com o banco de dados
import express from 'express';
import pool from './banco.mjs';

const app = express();
app.use(express.json());

// Rota para criar um novo assunto
app.post('/api/cadastrar-assunto', async (req, res) => {
    const { nome, descricao, monitor_id } = req.body;

    try {
        // Inserir o assunto no banco de dados
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

export default app;
