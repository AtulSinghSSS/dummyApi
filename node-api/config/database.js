require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,   // CarRental
  process.env.DB_USER,   // singhatul
  process.env.DB_PASS,   // AtulSk@221
  {
    host: process.env.DB_HOST, // singhatul.database.windows.net
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: false
      }
    }
  }
);

module.exports = sequelize;
