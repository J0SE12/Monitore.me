import express from 'express';
import pkg from 'body-parser';
import bancoRoute from './banco.mjs';

const { json } = pkg;

const app = express();
const port = 3000;

app.use(json());

// Rotas básicas
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Monitore.me!');
});

// Utilize a rota importada
app.use('/api', bancoRoute);

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

