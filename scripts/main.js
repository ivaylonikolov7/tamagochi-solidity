const { ethers } = require("hardhat");

async function main() {
    // We get the contract to deploy
    const Market = await ethers.getContractFactory("Market");
    const market = await Market.deploy();

    const Food = await ethers.getContractFactory("Food");
    const food = await Food.deploy(market.address);


    const Pet = await ethers.getContractFactory('Pet');
    const pet = await Pet.deploy(food.address);
  }

  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });