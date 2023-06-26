const hre = require("hardhat");

async function main() {
  const { abi } = require('../artifacts/contracts/SimpleStorage.yul/SimpleStorage.json');
  const { bytecode } = require('../artifacts/contracts/SimpleStorage.yul/SimpleStorage.json');

  const SimpleStorage = await hre.ethers.getContractFactory(abi, bytecode);
  const simpleStorage = await SimpleStorage.deploy();
  await simpleStorage.deployed();
  console.log(`SimpleStorage deployed: ${simpleStorage.address}`);

  const [signer, _] = await ethers.getSigners();
  const ethersSimpleStorage = new hre.ethers.Contract(
    simpleStorage.address, 
    [
      'function retrieve() public view returns (uint256)',
      'function store(uint256 newValue) public'
    ],
    signer
  );
  await ethersSimpleStorage.store(10);
  console.log(`store(10) executed`);

  const val = await ethersSimpleStorage.retrieve();
  console.log(`retrieve() executed: ${val.toString()}`);
}
main();


