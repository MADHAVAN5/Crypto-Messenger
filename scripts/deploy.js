const hre = require("hardhat");

async function main() {
  const Messenger = await hre.ethers.getContractFactory("Messenger");
  const messenger = await Messenger.deploy();

  await messenger.deployed();

  console.log(
    `Contract Address: ${messenger.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
