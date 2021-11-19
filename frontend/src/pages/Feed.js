import Web3Helpers from '../Web3/Helpers'
import {ReactComponent as BananaSVG} from '../images/bananas.svg'
import { useState } from 'react';
import '../style/pacman.css'
import Pacman from '../components/Pacman';

function Feed(props){
    let [feedingRn, setFeedingRn] = useState(false);
    let [feedTokensIn, setFeedTokensIn] = useState(0);

    function inputChange(e){
        setFeedTokensIn(e.target.value);
    }

    return (<>
        <div id="buy-coins">
            Feed PET coins 
            <input type="text" value={feedTokensIn} onChange = {inputChange}/>
            <button style={{
                marginBottom: '50px'
            }} onClick={()=>{
                feedPet(props).then(()=>{
                    setFeedingRn(true);
                    setTimeout(()=>{
                        setFeedingRn(false);
                    },5000)
                    setFeedTokensIn('');
                });
            }}>Feed</button>
            <Pacman feeding={feedingRn} />
        </div>
        
    </>)
    async function feedPet(props){
        const web3 = await Web3Helpers.web3();
        let currentAddress = web3.currentProvider.selectedAddress;
        let petContract = await Web3Helpers.petContract();

        let foodContract = await Web3Helpers.foodContract();

        await petContract.methods.feed(feedTokensIn).send({
            from: currentAddress
        })
        let balance = await foodContract.methods.balanceOf(currentAddress).call();
        console.log(balance);
        props.setTokens(balance);
    }
}
export default Feed;