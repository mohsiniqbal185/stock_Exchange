
const axios = require('axios');


async function fetchDataFromPolygon(apiKey, tickerSymbol, startDate, endDate) {
  try {
    //Get data from Polygon API
    const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${tickerSymbol}/range/1/day/${startDate}/${endDate}?apiKey=${apiKey}`;
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      const data = response.data;

      return (data);

    } else {
      console.error('API Request Failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('An error occurred while making the API request:', error.message);
  }
}

module.exports = { fetchDataFromPolygon };