import { run, ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("deployer address: ", deployer);
  const deployerBalance = await (await deployer.getBalance()).toString();
  console.log("deplyer balance: ", deployerBalance);
  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({ value: ethers.utils.parseEther("0.1") });
  await waveContract.deployed();

  console.log("wave portal address: ", waveContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
