const concurrently = require('concurrently');
const checkSiteAvailability = require("./backend/utils/checkStatus");

concurrently(
  [
    'npm run --prefix=backend start:hardhat',
  ],
);

const connect = setInterval(() => checkSiteAvailability(process.env.HARDHAT_URL).then(isAvailable => {
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