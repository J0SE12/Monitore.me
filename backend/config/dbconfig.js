import { createConnection } from 'mysql';

const db = createConnection({
  host: 'localhost',
  user: 'Jose',
  password: 'teka5751',
  database: 'monitore'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

export default db;
