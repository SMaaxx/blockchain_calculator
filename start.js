const concurrently = require('concurrently');
const checkSiteAvailability = require("./backend/utils/checkStatus");

concurrently(
  [
    'npm run --prefix=backend start:hardhat',
  ],
);

const connect = setInterval(() => checkSiteAvailability("http://127.0.0.1:8545/").then(isAvailable => {
  const deploy = () => {
    concurrently(
      [
        'npm run --prefix=backend start:server'
      ],
      {
        restartTries: 20
      }
    );

    setTimeout(() => {
      concurrently(
      [
        'npm run --prefix=frontend start'
      ]
    )}, 10000)
  }

  if(!isAvailable) {
    deploy();
    clearInterval(connect);
  }
}), 5000);