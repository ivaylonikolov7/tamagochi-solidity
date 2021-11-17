// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Food is ERC20, ERC20Burnable {
    Market private  _market;
    
    constructor(Market _address) ERC20("Food", "FOD") {
        _mint(msg.sender, 15000);
        _market = _address;
    }
    function getMarketAddress() public view returns(address){
        return address(_market);
    }
    
    function mintTokens(uint256 value) public returns(uint256){
        require(address(_market) == msg.sender, "Cant call the function outside of Market contract");
        if(address(_market) == msg.sender){
            super._mint(address(_market), value);
        }
        return super.totalSupply();
    }
    function buy() public payable{
        uint256 newCoins = msg.value/100;
        transfer(msg.sender, newCoins);
        //console.log(balanceOf(msg.sender));
    }
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
    uint256 lastFed;
    uint256 fourHours = 4000;
    enum PetStates{
        DEAD, ALIVE
    }
    PetStates petState = PetStates.ALIVE;
    constructor(){
        lastFed = block.timestamp;
    }
    function feed() public{
        uint256 currentTime = block.timestamp;
        if(currentTime >= lastFed + fourHours){
            petState = PetStates.DEAD;
        }
        else{
            //
        }
    }
}