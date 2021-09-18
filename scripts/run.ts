import { run, ethers } from "hardhat";

async function main() {
  await run("compile");
  const [owner, person1] = await ethers.getSigners();
  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({ value: ethers.utils.parseEther("0.1") });
  await waveContract.deployed();
  console.log("wave contract deployed to:", waveContract.address);
  console.log("Constract deployed by: ", owner.address);

  let contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log("contract balance: ", ethers.utils.formatEther(contractBalance));

  let waveCount = await waveContract.getTotalWaves();
  console.log("initial => total waves is: ", waveCount);

  let waveTx = await waveContract.wave("A Message!");
  await waveTx.wait();

  waveTx = await waveContract.wave("2nd Message!");
  await waveTx.wait();

  const otherWave = await waveContract.connect(person1).wave("person1's message");
  await otherWave.wait();

  waveCount = await waveContract.getTotalWaves();
  console.log("after some other people waving => total waves is: ", waveCount);

  const allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

  contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log("contract balance: ", ethers.utils.formatEther(contractBalance));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
