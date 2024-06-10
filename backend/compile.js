const solc = require("solc");
const path = require("path");
const fs = require("fs");

const contractName = 'mathOperations'
const fileName = `./contracts/${contractName}.sol`;

const contractPath = path.join(__dirname, fileName);
const sourceCode = fs.readFileSync(contractPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    [fileName]: {
      content: sourceCode,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));
const bytecode = compiledCode.contracts[fileName][contractName].evm.bytecode.object;
const bytecodePath = path.join(__dirname, "./artifacts/mathOperationsBytecode.bin");
const abi = compiledCode.contracts[fileName][contractName].abi;
const abiPath = path.join(__dirname, "./artifacts/mathOperationsAbi.json");

fs.writeFileSync(bytecodePath, bytecode);
fs.writeFileSync(abiPath, JSON.stringify(abi, null, "\t"));