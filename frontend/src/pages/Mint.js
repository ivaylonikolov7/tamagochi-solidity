import { useEffect, useState } from "react";
import Web3Helpers from '../Web3/Helpers'

function Mint() {
    let [totalSupply, setTotalSupply] = useState(0)
    let [tokensMinted, setTokensMinted] = useState(0);
    function inputChange(e){
        setTokensMinted(e.target.value);
    }

    useEffect(async ()=>{
        let foodContract = await Web3Helpers.foodContract()
        setTotalSupply(await foodContract.methods.totalSupply().call())
    })
    return (<div style={{
        marginTop: '30px'
    }}>
        <label for="mint">Mint tokens</label>
        <input type="text" onChange={inputChange} />
        <button id="mint-tokens" onClick={async ()=>{
            let marketContract = await Web3Helpers.marketContract();
            let foodContract = await Web3Helpers.foodContract();
            let currentAddres = await Web3Helpers.currentAddress()
            await marketContract.methods.mint(foodContract.options.address, tokensMinted).send({
                from: currentAddres
            });
            setTotalSupply(await foodContract.methods.totalSupply().call());
        }}>Mint tokens</button>
        <div id="total-supply">
            Total Supply: {totalSupply} FOD
        </div>
    </div>)
}
export default Mint;