const ethers = require('ethers');
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/ac4ee78b45474f19874fd00a6b0ac7ff');

const usdcAbi = [
  'function balanceOf(address) view returns (uint)',
  'function decimals() view returns (uint)'
];
const usdcAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; 
const usdc = new ethers.Contract(usdcAddress, usdcAbi, provider);

async function init() {
  const balance = await usdc.balanceOf('0xd8da6bf26964af9d7eed9e03e53415d37aa96045');
  const decimals = await usdc.decimals();
  const formattedBalance = ethers.formatUnits(balance, decimals);
  console.log(`USDC balance of Vitalik Buterin: ${formattedBalance}`);
}

init();
