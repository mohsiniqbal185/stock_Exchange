const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path")
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
const {connection} = require('./config/db')
app.use(cors({credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));  
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Server is up and running!');

  });

  const port = 5000;
app.use('/get_stock_closing_prices', require('./routes/getstockDataRoute'));

app.listen(port, () => console.log(`welcome to the server `+port));
