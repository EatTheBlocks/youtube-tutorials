async function main() {
  // We get the contract to deploy
  const Todo = await ethers.getContractFactory("Todo");
  const todo = await Todo.deploy();

  await todo.deployed();

  console.log("Todo deployed to:", todo.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
