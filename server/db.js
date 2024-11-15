import mysql from 'mysql';

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Mrblandmax7!',
  database: 'fitnessplanner_db'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

export default db;
