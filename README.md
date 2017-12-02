# Bitcoin API

This application exposes an API that provides information on the last N bitcoin blocks.

### Design

This API is built using the koa framework. It uses data from the https://blockchain.info API to get blockchain information as well as https://api.coindesk.com to get BTC to USD conversion rates.

This application uses redis for caching but only if a redis URI is provided and the server responds, otherwise it is not used.

### Requirements

- Node.js version 8.9.1
- Redis server (optional, needed only for caching)

### Setup

- `$ cp .env.example .env` (configure your environment variables)
- `$ npm i`
- `npm start`

### How to consume the API

- Getting information for the last 5 blocks (subsequent requests will be much faster if using redi caching):

  `http://localhost:3000/api/blocks/5`

###  Responses

  - Success response:

  `Response Status: 200`

  ```json
  {
      "usdExchangeRate": 10859.5625,
      "blocks": [
        {
          "minTransaction": 0.0000273,
          "maxTransaction": 152.28253800000002,
          "avgTransaction": 2.2308505634274183,
          "btcTotal": 3872.756578109998,
          "time": 1512240875,
          "height": 497246,
          "transactionsCount": 1736,
          "transactions": [{
            "hash": "2796df4713d5f752fa047c0d6c02a546ce3b36f873cf326ff5bd4aea1a19ad02",
            "btc": 13.6790149,
            "relayedBy": "0.0.0.0",
            "ioRatio": 0.5
          },
          {
            "hash": "7c3dd32cf9ad20c7b176d0f2c95686e65c14533b8739cd1a32969628008e8f03",
            "btc": 0.02710626,
            "relayedBy": "0.0.0.0",
            "ioRatio": 1.5
          }]
        }
      ]
  }
  ```

  -  Other responses:

    - Client error (400):

      ```
        Too many blocks requested
      ```

    - Server error (500):

        ```
         Internal Server Error
        ```
