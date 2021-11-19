
import { useState } from 'react';
import Web3Helpers from '../Web3/Helpers';

function Index(props) {
    let [tokensInput, setTokensInput] = useState('')
    function inputChange(e){
        setTokensInput(e.target.value);
    }
    return (<>
        <div id="buy-coins">
            Buy more coins
            <input type="text" onChange={inputChange} value={tokensInput} />
            <button onClick={()=>{
                buyTokens(props.setTokens)
            }}>Buy coins</button>
        </div>
    </>)

    async function buyTokens(updateCoins){
        const web3 = await Web3Helpers.web3();
        let currentAddress = web3.currentProvider.selectedAddress;
        let foodContract = await Web3Helpers.foodContract();
        await foodContract.methods.buy().send({
            from: currentAddress,
            value: web3.utils.toWei(tokensInput)
        })
        let newCoins = await foodContract.methods.balanceOf(currentAddress).call();
        updateCoins(newCoins);
    }
}

export default Index;