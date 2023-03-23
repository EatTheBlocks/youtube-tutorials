const ethers = require('ethers');
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/ac4ee78b45474f19874fd00a6b0ac7ff');

async function init() {
  const blockNumber = await provider.getBlockNumber()
  console.log(`Current block number: ${blockNumber}`);
}

init();