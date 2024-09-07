import { pool } from './banco.mjs'; // Ajuste o caminho se necessário

(async () => {
  try {
    const [results] = await pool.query('SELECT 1 + 1 AS result');
    console.log(results);
  } catch (error) {
    console.error('Erro ao testar conexão com o banco de dados:', error);
  }
})();
