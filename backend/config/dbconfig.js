import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'Jose',
  password: 'teka5751',
  database: 'monitore'
});

export default pool;
