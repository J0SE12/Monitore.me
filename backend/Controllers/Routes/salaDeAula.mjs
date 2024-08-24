import express from 'express';
import pool from '../banco.mjs'; // Certifique-se de ajustar o caminho conforme sua estrutura

const router = express.Router();

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

export default router;
