const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("jarhead");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("jarhead",  {value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();
  console.log("Transaction complete:", txn.hash);

  const address = await domainContract.getAddress("jarhead");

  txn = await domainContract.setRecord("crayon-eater", address);
  await txn.wait();

  console.log("Owner of domain jarhead:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();