const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'Jose',
  password: 'teka5751',
  database: 'monitore_me'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

module.exports = db;
