import  FoodContractABI from "../artifacts/contracts/exercise.sol/Food.json";
import  MarketABI from "../artifacts/contracts/exercise.sol/Market.json";
import  PetABI from "../artifacts/contracts/exercise.sol/Pet.json";

import Web3 from "web3";

export default {
    web3: async function(){
        async function getWeb3(){
            let web3;
            if(window.ethereum){
                web3 = new Web3(window.ethereum);
                await window.ethereum.request({method: 'eth_requestAccounts'});
            }else if(window.web3){
                web3 = new Web3(window.web3.currentProvider);
            }
            return web3;
        }
        
        let web3 = await getWeb3();
        return web3;
    },
    foodContract: async function(){
        let web3 = await this.web3();
        let foodContractAddress = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9";
        let foodContract = await new web3.eth.Contract(FoodContractABI.abi, foodContractAddress);
        return foodContract;
    },
    marketContract: async function(){
        let web3 = await this.web3();
        let marketContractAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";
        let marketContract = await new web3.eth.Contract(MarketABI.abi, marketContractAddress);
        return marketContract
    },
    petContract: async function(){
        let web3 = await this.web3();
        let petContractAddress = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9";
        let petContract = await new web3.eth.Contract(PetABI.abi, petContractAddress);
        return petContract;
    },
    currentAddress: async function(){
        let web3 = await this.web3();
        return web3.currentProvider.selectedAddress;
    }
}




