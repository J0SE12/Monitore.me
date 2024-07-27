import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'Jose',
  password: 'teka5751',
  database: 'monitore'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

export default db;
