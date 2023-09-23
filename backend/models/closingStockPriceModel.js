const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance and define the database connection
// const sequelize = new Sequelize('stock_exchange', 'root', 'root', {
//     host: 'localhost',
//     dialect: 'mysql', // Specify the dialect for MySQL
// });
//Database Config
const dbConfig = {
    host: process.env.DB_HOST || 'mysql',
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'stock_exchange',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  //Sequelize Connection
  const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

// Test the database connection
async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
// Define Stock Data
const StockExchangeData = sequelize.define('stock_exchange_data', {
    ticker_symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,

    },
    
    date: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
    },

    closing_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
});


// Sync the model with the database to create the "Users" table if it doesn't exist
sequelize.sync();
module.exports = { StockExchangeData, sequelize };