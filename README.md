## Install Docker

First, you need to install Docker. Visit the [Docker website](https://www.docker.com/get-started) to download Docker for
your specific platform (Windows, macOS, or Linux).

## Change to the Backend Directory

Navigate to your project's backend directory using the cd command in your terminal:

```shell
cd backend
```


## Run Docker Compose

To start your Dockerized application, use Docker Compose. Run the following command within the project directory:

```shell
docker-compose up -d
```


## Access the Application

Once your Docker containers are up and running, you can access your application. You can use the curl command to
interact with it. For example, to retrieve stock closing prices for a specific ticker symbol (e.g., AAPL) between a
given start and end date (e.g., 2023-05-01 to 2023-05-30), use the following curl command:

```shell
curl --location 'http://localhost:3000/get_stock_closing_prices?tickerSymbol=AAPL&startDate=2023-05-01&endDate=2023-05-30'
```
