
const getStockData = (req,res) => {
    const { restClient } = require("@polygon.io/client-js")
const rest = restClient("rDPnzP8paq1pGYG7fMNdyLlBc3wcpx8P")

rest.stocks
    .aggregates("AAPL", 1, "day", "2019-01-01", "2019-02-01")
    .then((data) => {
        console.log(data)
    })
    .catch((e) => {
        console.error("An error happened:", e)
    })
  
    res.status(200).json("data");
}

module.exports = {getStockData};