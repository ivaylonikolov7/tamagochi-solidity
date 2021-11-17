const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Food", function () {
  it("Should return its address", async function () {
    const MarketContract = await ethers.getContractFactory("Market");
    //const FoodContract = await ethers.getContractFactory("Food");
    const market = await MarketContract.deploy();

    expect(market.address).to.equal(await market.getAddress());
    //expect(await greeter.greet()).to.equal("Hello, world!");

    //const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    //await setGreetingTx.wait();

    //expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
  it("Should return how many tokens you have created", async function(){
    const MarketContract = await ethers.getContractFactory("Market");
  })
});