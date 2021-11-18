const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Food", function () {
  it("Should return its address", async function () {
	const MarketContract = await ethers.getContractFactory("Market");
	const market = await MarketContract.deploy();
	expect(market.address).to.equal(await market.getAddress());
  });
  it("Should return market's address as in food's contracts market property", async function(){
	const MarketContract = await ethers.getContractFactory("Market");
	const FoodContract = await ethers.getContractFactory("Food");

	let market = await MarketContract.deploy();
	let marketAddress = await market.getAddress();
	let food = await FoodContract.deploy(marketAddress);
	let foodMarketAddress = await food.getMarketAddress();
	
	expect(marketAddress).to.equal(foodMarketAddress);
  })
  it('Should mint only if called from market\'s address', async function(){
	const MarketContract = await ethers.getContractFactory("Market");
	const FoodContract = await ethers.getContractFactory("Food");

	let market = await MarketContract.deploy();
	let marketAddress = await market.getAddress();
	let food = await FoodContract.deploy(marketAddress);
	let foodMarketAddress = await food.getMarketAddress();

	await market.mint(food.address, 200);

	expect(await food.totalSupply()).to.equal(1500200); 
	await expect(food.mintTokens(500)).to.be.reverted;
  })
  it('should buy into 1/100 ratio', async function(){
	  
	const FoodContract = await ethers.getContractFactory("Food");
	const MarketContract = await ethers.getContractFactory("Market");
	
	const [owner] = await ethers.getSigners();
	let market = await MarketContract.deploy();
	let marketAddress = await market.getAddress();

	let food = await FoodContract.deploy(marketAddress);

	let coins = await food.buy({
		value: ethers.utils.parseEther("5")
	});
	
	await expect(coins).to.emit(food, "Bought").withArgs(owner.address, food.address, 500);
  })
});

describe("Pet", function () {
	it("Should have timestamp", async function () {
		const FoodContract = await ethers.getContractFactory("Food");
		const MarketContract = await ethers.getContractFactory("Market");
		const PetContract = await ethers.getContractFactory("Pet");
	
		const [owner] = await ethers.getSigners();

		let market = await MarketContract.deploy();
		let marketAddress = await market.getAddress();

		let food = await FoodContract.deploy(marketAddress);
		let pet = await PetContract.deploy(food.address);

		expect(await pet.getLastFed()).to.not.equal(0);
	})
	it('Should send food tokens', async function(){
		const FoodContract = await ethers.getContractFactory("Food");
		const MarketContract = await ethers.getContractFactory("Market");
		const PetContract = await ethers.getContractFactory("Pet");
	
		const [owner] = await ethers.getSigners();

		let market = await MarketContract.deploy();
		let marketAddress = await market.getAddress();

		let food = await FoodContract.deploy(marketAddress);
		let pet = await PetContract.deploy(food.address);

		let totalSupply = await food.totalSupply();

		await food.buy({
			value: ethers.utils.parseEther("5")
		})

		await pet.feed(400);

		let newTotalSupply = await food.totalSupply();
		let balance = await food.balanceOf(owner.address)

		expect(balance).to.equal(100);
		expect(totalSupply-newTotalSupply).to.equal(400);
	})
	it('Should not be starving', async function(){
		const FoodContract = await ethers.getContractFactory("Food");
		const MarketContract = await ethers.getContractFactory("Market");
		const PetContract = await ethers.getContractFactory("Pet");
	
		const [owner] = await ethers.getSigners();

		let market = await MarketContract.deploy();
		let marketAddress = await market.getAddress();

		let food = await FoodContract.deploy(marketAddress);
		let pet = await PetContract.deploy(food.address);

		await food.buy({
			value: ethers.utils.parseEther("5")
		})

		await pet.feed(400);
		let timestampNow = new Date();
		let dateThenBc =  await pet.getLastFed()
		let dateThen = new Date(dateThenBc*1000)
		expect(timestampNow).to.lessThan(dateThen);
	})
})