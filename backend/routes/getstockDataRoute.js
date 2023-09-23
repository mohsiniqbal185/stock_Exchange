const express = require('express');
const router = express.Router();
const { fetchDataFromPolygon } = require('../controllers/getStockDataFromPolygon')
const {getStockData} = require ('../controllers/getStockData');
//api route
router.get("/", getStockData);
module.exports = router;