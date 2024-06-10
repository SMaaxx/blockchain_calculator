const { Web3 } = require("hardhat");
const path = require("path");
const fs = require("fs");

const web3 = new Web3("http://127.0.0.1:8545/");

const deployedAddressPath = path.join(__dirname, "./artifacts/mathOperationsAddress.txt");
const deployedAddress = fs.readFileSync(deployedAddressPath, "utf8");

const abi = require("./artifacts/mathOperationsAbi.json");
const myContract = new web3.eth.Contract(abi, deployedAddress);
myContract.handleRevert = true;

const useContractMethod = async (action) => {
  try {
    switch (action.type) {
      case "add":
        console.log(action);
        return await myContract.methods.add(action.payload.firstArg, action.payload.secondArg).call();
      case "subtract":
        console.log(action);
        return await myContract.methods.subtract(action.payload.firstArg, action.payload.secondArg).call();
      case "multiply":
        console.log(action);
        return await myContract.methods.multiply(action.payload.firstArg, action.payload.secondArg).call();
      case "divide":
        console.log(action);
        return await myContract.methods.divide(action.payload.firstArg, action.payload.secondArg).call();
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = useContractMethod;