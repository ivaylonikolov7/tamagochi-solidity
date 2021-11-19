import { useEffect, useState } from "react";
import Web3Helpers from '../Web3/Helpers';
import {ReactComponent as BurgerSVG} from '../images/burger.svg';
import { Link } from "react-router-dom";
function Header(props) {

    let [address,setAddress] = useState('0x0');

	useEffect(async ()=>{
        let addressTemp = await Web3Helpers.currentAddress()
        setAddress(addressTemp);

        let foodContract = await Web3Helpers.foodContract();
        let balance = await foodContract.methods.balanceOf(addressTemp).call();
        props.setTokens(balance);
        
	})
    return (<>
        <div id="header">
            <div id="address">
                Address: {address}
            </div>
            <div id="tokens">
                <BurgerSVG height="20px" width="20px" style={{
                    marginRight: "10px"
                }}
                />
                {props.tokens} FOD tokens
            </div>
        </div>
        <ul>
            <li>
                <Link to='/'>
                    Index
                </Link>
            </li>
            <li>
                <Link to='/feed'>
                    Feed
                </Link>
            </li>
            <li>
                <Link to='/Mint'>
                    Mint
                </Link>
            </li>
        </ul>
    </>)
}

export default Header;