const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance and define the database connection
const sequelize = new Sequelize('stock_exchange', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql', // Specify the dialect for MySQL
});

// Test the database connection
async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
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