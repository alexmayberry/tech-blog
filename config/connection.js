const Sequelize = require('sequelize');
require('dotenv').config();

let sequelizeConnection;

if (process.env.JAWSDB_URL) {
  sequelizeConnection = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelizeConnection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelizeConnection;
