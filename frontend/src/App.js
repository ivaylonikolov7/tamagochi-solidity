import './App.css';
import {
	BrowserRouter,
	Routes,
	Route,
	Link
  } from "react-router-dom";

  import {useState } from "react";

import Header from './components/Header';
  
import Index from './pages/Index';
import Mint from './pages/Mint'
import Feed from './pages/Feed';
function App() {
	
	let [foodTokens, setFoodTokensFE] = useState(0);

	function updateFoodToken(value){
		setFoodTokensFE(value);
	}
	return (
		<BrowserRouter>
			<Header tokens={foodTokens} setTokens = {updateFoodToken} />
			<Routes>
				<Route path="/" element={<Index tokens = {foodTokens} setTokens={updateFoodToken}/>} />
				<Route path="/mint" element={<Mint />} />
				<Route path="/feed" element={<Feed setTokens={updateFoodToken}/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
