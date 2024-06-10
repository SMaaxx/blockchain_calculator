const { Web3 } = require("hardhat");
const path = require("path");
const fs = require("fs");

const web3 = new Web3("http://127.0.0.1:8545/");
const bytecodePath = path.join(__dirname, "./artifacts/mathOperationsBytecode.bin");
const bytecode = fs.readFileSync(bytecodePath, "utf8");

const abi = require("./artifacts/mathOperationsAbi.json");
const myContract = new web3.eth.Contract(abi);
myContract.handleRevert = true;

const deploy = async () => {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];
  const contractDeployer = myContract.deploy({
    data: "0x" + bytecode,
    arguments: [1],
  });

  try {
    const tx = await contractDeployer.send({
      from: defaultAccount
    });
    const deployedAddressPath = path.join(__dirname, "./artifacts/mathOperationsAddress.txt");
    fs.writeFileSync(deployedAddressPath, tx.options.address);
  } catch (error) {
    console.error(error);
  }
}

deploy().then();