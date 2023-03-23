const ethers = require('ethers');
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/ac4ee78b45474f19874fd00a6b0ac7ff');

async function init() {
  //ens addresses also work, like vitalik.eth
  const balance = await provider.getBalance('0xd8da6bf26964af9d7eed9e03e53415d37aa96045')
  const formattedBalance = ethers.formatEther(balance);
  console.log(`Ether balance of Vitalik Buterin: ${formattedBalance}`);
}

init();
