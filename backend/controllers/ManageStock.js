
const { fetchDataFromPolygon } = require('./getStockDataFromPolygon');
const { Sequelize } = require('sequelize');
const {StockExchangeData} = require('../models/closingStockPriceModel');


async function insertStockinDB(apiKey, tickerSymbol, startDate, endDate, resultArray) {
  const formattedData = [];

  try {
    //get data from polygon api
    const dataFromPolygon = await fetchDataFromPolygon(apiKey, tickerSymbol, startDate, endDate);

    const formattedData = dataFromPolygon.results.map((item) => ({
      tickerSymbol: tickerSymbol,
      date: new Date(item.t).toISOString().split('T')[0],
      closingRate: item.c,
    }));

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const dateArray = [];
    for (let date = startDateObj; date <= endDateObj; date.setDate(date.getDate() + 1)) {
      dateArray.push(date.toISOString().split('T')[0]);
    }

    const bulkArray = [];
    //push missing data into bulkArray
    for (let date of dateArray) {
      if (!resultArray.find((item) => item.date === date)  ) {
        const matchingData = formattedData.find((item) => item.date === date);
        bulkArray.push({
          date: date,
          ticker_symbol: tickerSymbol,
          closing_amount: matchingData ? matchingData.closingRate : null,
        });
      }
    }
    //push missing data in DB
    await StockExchangeData.bulkCreate(bulkArray);
    console.log('All data inserted.');
    return formattedData;


  } catch (error) {
    console.error('Error:', error);
    return error;
  }

  // console.log('formatted data:', formattedData);
}

module.exports = { insertStockinDB };
