const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: true
    }
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar no banco:', err);
    } else {
        console.log('Conexão com o banco de dados estabelecida');
    }
});

module.exports = db;
