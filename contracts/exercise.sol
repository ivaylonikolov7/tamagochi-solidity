// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "hardhat/console.sol";

contract Food is ERC20, ERC20Burnable {
    Market private  _market;
    
    constructor(Market _address) ERC20("Food", "FOD") {
        _mint(address(this), 1500000);
        console.log('mint', address(this));
        _market = _address;
    }
    function getMarketAddress() public view returns(address){
        return address(_market);
    }
    
    function mintTokens(uint256 value) public returns(uint256){
        require(address(_market) == msg.sender, "Cant call the function outside of Market contract");
        if(address(_market) == msg.sender){
            super._mint(address(this), value);
        }
        return super.totalSupply();
    }
    function buy() public payable{
        console.log('buy', address(this));
        uint256 newCoins = (msg.value*100/1 ether);
        if(newCoins == 0){
            payable(address(msg.sender)).transfer(msg.value);
        }
        else{
            transferFromContract(msg.sender, newCoins);
        }
        emit Bought(msg.sender, address(this), balanceOf(msg.sender));
    }
    function burn(address sender,uint256 amount) public{
        _burn(sender, amount);
    }
    function transferFromContract(address recipient, uint256 amount) public returns (bool) {
        _transfer(address(this), recipient, amount);
        return true;
    }
    event Bought(address sender, address reciever, uint amount);
} 

contract Market {
    constructor(){
    }
    
    function getAddress() public view returns(address){
        return address(this);
    }
    function mint(Food _address, uint256 mintedCoins) public returns(uint256){
        Food(_address).mintTokens(mintedCoins);
        return mintedCoins;
    }
}

contract Pet{
    uint256 _lastFed;
    address private _foodAddress;

    constructor(address foodAddressArg){
        _lastFed = block.timestamp;
        _foodAddress = foodAddressArg;
    }

    function feed(uint256 value) public{
        uint256 currentTime = block.timestamp;
        require(currentTime < _lastFed + 4 hours, 'Your pet starved to death, sorry. Your FOD coins were returned');
        console.log(value);
        Food(_foodAddress).burn(msg.sender, value);
        _lastFed = block.timestamp;
    }
    function getLastFed() public view returns (uint256){
        return _lastFed;
    }
}