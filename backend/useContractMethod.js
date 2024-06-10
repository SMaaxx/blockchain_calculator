const { Web3 } = require("hardhat");
const path = require("path");
const fs = require("fs");

const web3 = new Web3(process.env.HARDHAT_URL);

const deployedAddressPath = path.join(__dirname, "./artifacts/mathOperationsAddress.txt");
const deployedAddress = fs.readFileSync(deployedAddressPath, "utf8");

const abi = require("./artifacts/mathOperationsAbi.json");
const myContract = new web3.eth.Contract(abi, deployedAddress);
myContract.handleRevert = true;

const useContractMethod = async (action) => {
  try {
    switch (action.type) {
      case "add":
        return await myContract.methods.add(action.payload.firstArg, action.payload.secondArg).call();
      case "subtract":
        return await myContract.methods.subtract(action.payload.firstArg, action.payload.secondArg).call();
      case "multiply":
        return await myContract.methods.multiply(action.payload.firstArg, action.payload.secondArg).call();
      case "divide":
        return await myContract.methods.divide(action.payload.firstArg, action.payload.secondArg).call();
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = useContractMethod;