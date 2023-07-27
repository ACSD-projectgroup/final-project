import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { InputGroup, Form } from "react-bootstrap";
import DetailedCrypto from './DetailedCrypto'

function SearchCrypto() {


    //variables used 
    const [query, setQuery] = useState("");
    const [coinData, setCoinData] = useState([]);
    const [displayResult, setDisplayResult] = useState(false);

    //retreives search query form user
    function handleSearchQuery(e) {
        e.preventDefault()
        setQuery(e.target.value);
    }
    //used to query the coin egcko api
    async function searchCoins(e) {
        e.preventDefault();
        let response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + query + "&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en")
        console.log(response.data)
        setCoinData(response.data[0]);
        console.log(coinData)
        setDisplayResult(true)
    }

    //iff all is well output search resilt
    if (displayResult == true && coinData != undefined) {
        return (
            <div className="container">
                <h2 className="text-center m-4">Search Crypto Currencies</h2>
                <form onSubmit={searchCoins}>
                    <InputGroup>
                        <Form.Control onChange={handleSearchQuery} onSubmit={searchCoins} placeholder="Search crypto"></Form.Control>
                    </InputGroup>
                </form>
                <DetailedCrypto name={coinData.name} symbol={coinData.symbol} price={coinData.current_price}
                    highest={coinData.ath} lowest={coinData.atl} marketCap={coinData.market_cap} marketRank={coinData.market_cap_rank} dailyPercentage={coinData.price_change_percentage_24h} image={coinData.image} />
            </div>
        )
    }
    //if user enters an invalid search term output this
    else if (coinData == undefined) {
        return (
            <div className="container">
                <h2 className="text-center m-4">Search Crypto Currencies</h2>
                <form onSubmit={searchCoins}>
                    <InputGroup>
                        <Form.Control onChange={handleSearchQuery} onSubmit={searchCoins} placeholder="Search crypto"></Form.Control>
                    </InputGroup>
                    <h3 class="colorRed">Please enter a vlaid search item!</h3>

                </form>
            </div>
        )
    }
    //default output
    else {
        return (
            <div className="container">
                <h2 className="text-center m-4">Search Crypto Currencies</h2>
                <form onSubmit={searchCoins}>
                    <InputGroup>
                        <Form.Control onChange={handleSearchQuery} onSubmit={searchCoins} placeholder="Search crypto"></Form.Control>
                    </InputGroup>
                </form>
            </div>
        )
    }

}

export default SearchCrypto