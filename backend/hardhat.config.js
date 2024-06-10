require('@nomiclabs/hardhat-waffle');
require("@nomicfoundation/hardhat-web3-v4");

module.exports = {
  networks: {
    hardhat: {
      chainId: 31337,
      port: process.env.HARDHAT_PORT
    },
  },
  solidity: "0.8.26",
};