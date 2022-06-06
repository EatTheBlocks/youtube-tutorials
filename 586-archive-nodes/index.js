const ethers = require("ethers");
const infuraURL = "YOUR_PROJECT_ID_HERE"; // TODO: Add Infura Project ID

const provider = new ethers.providers.InfuraProvider("mainnet", infuraURL);

const main = async () => {
  const userAddress = "ADDRESS_WITH_LOTS_OF_ETH"; // TODO: Add Address of your choice
  const startBlock = 11565019; // TODO: Add start block of your choice
  const endBlock = 13916165; // TODO: Add end block of your choice

  // Get current balance
  const currentBalance = await provider
    .getBalance(userAddress)
    .then((bal) => ethers.utils.formatEther(bal));

  // Get balance from the start of 2021
  const startBalance = await provider
    .getBalance(userAddress, startBlock)
    .then((bal) => ethers.utils.formatEther(bal));

  // Get balance from the end of 2021
  const endBalance = await provider
    .getBalance(userAddress, endBlock)
    .then((bal) => ethers.utils.formatEther(bal));

  // Get number of transactions for start of year
  const startTxnCount = await provider.getTransactionCount(
    userAddress,
    startBlock
  );

  // Get number of transactions for end of year
  const endTxnCount = await provider.getTransactionCount(userAddress, endBlock);

  // Difference between start and end balances
  const diffBal = endBalance - startBalance;

  // Difference between start and end transaction counts
  const diffTxns = endTxnCount - startTxnCount;

  console.log("User:", userAddress);
  console.log("Current ETH:", currentBalance);
  console.log("Start of 2021 bal: ", startBalance);
  console.log("End of 2021 bal: ", endBalance);
  console.log("Bal Diff:", diffBal);
  console.log("Num Of Transactions:", diffTxns);
};

main();
