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
sequelize.define('stock_exchange_data', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: {
      type: DataTypes.BIGINT, // Use BIGINT for epoch timestamps
      allowNull: false,
    },
    closing_amount: {
      type: DataTypes.DECIMAL(10, 2), // Use DECIMAL for monetary values (adjust as needed)
      allowNull: false,
    },
  });
  
  
  // Sync the model with the database to create the "Users" table if it doesn't exist
  sequelize.sync();
module.exports = {testDatabaseConnection};