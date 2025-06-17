// db.js
const mysql = require('mysql2'); // Using promise-based mysql2
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST|| 'localhost',
    user: process.env.DB_USER|| 'root',
    database: process.env.DB_NAME || 'HotelManagementt',
  port: Number(process.env.DB_PORT) || 3306,
  password: process.env.DB_PASSWORD || '0000',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();

