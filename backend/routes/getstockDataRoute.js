const express = require('express');
const router = express.Router();
const { getStockData } = require('../controllers/getStockData')

router.post("/", getStockData)
module.exports = router;