import express from 'express';
import { json } from 'body-parser';

const app = express();
const port = 3000;

app.use(json());

// Rotas básicas
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Monitore.me!');
});

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
