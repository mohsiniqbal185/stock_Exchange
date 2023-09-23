const {fetchDataFromPolygon} = require('./getStockDataFromPolygon');
const { Sequelize } = require('sequelize');
const {StockExchangeData} = require('../models/closingStockPriceModel');
const { insertStockinDB } = require('./ManageStock');
async function getStockData(req,res){
  //get query params
    const tickerSymbol = String(req.query.tickerSymbol);
    const startDate = String(req.query.startDate);
    const endDate = String(req.query.endDate);
    const apiKey = 'rDPnzP8paq1pGYG7fMNdyLlBc3wcpx8P';
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    //check if the range is wrong
    const timeDifference = endDateObj - startDateObj;
    if(timeDifference<=1){
        res.status(400).json({message:"invalid dates"})
    }

    //check db if the data for the date range and stock exists
    StockExchangeData.findAll({
        attributes: ['date', 'closing_amount'],
        where: {
          date: {
            [Sequelize.Op.between]: [startDate, endDate],
          },
          ticker_symbol: {
            [Sequelize.Op.eq]: tickerSymbol,
          },
    
        },
      })
        .then((data) => {
            const resultArray = data.map((record) => ({
                tickerSymbol:tickerSymbol,
              date: new Date(record.date).toISOString().split('T')[0], 
              closingRate: record.closing_amount,
              }));
 

        const daysDifference = timeDifference / (1000 * 60 * 60 * 24)+1;
        console.log(daysDifference);
        if (daysDifference==resultArray.length){ //the whole data exists in db
            res.status(200).json(resultArray);
        }
        else{
            //whole data doesn't exist in db
            returnArray=insertStockinDB(apiKey,tickerSymbol,startDate,endDate,resultArray).then(response=>{res.status(200).json(response);
            });
            
        }
        })
        .catch((error) => {
          console.error('Error querying data:', error);
        });

}

module.exports= {getStockData};