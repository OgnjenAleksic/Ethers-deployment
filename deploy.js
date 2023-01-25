const { ethers } = require("ethers");
const fs = require("file-system");
require("dotenv").config();

async function main() {
  console.log("Contract deploying...");
  const abi = fs.readFileSync("./myContract_sol_myContract.abi", "utf8");
  const bytecode = fs.readFileSync("./myContract_sol_myContract.bin", "utf8");

  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await contractFactory.deploy();
  console.log(`Contract deployed at ${contract.address}`);

  const newValue = await contract.addValue("20");
  const txReceipt = await newValue.wait(1);
  const getValue = await contract.getValue();
  console.log(`New value is ${getValue.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
