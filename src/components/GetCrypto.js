import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import ShowCrypto from './ShowCrypto'
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";

function GetCrypto() {


    //Store retreived data here
    const [coinData, setCoinData] = useState([]);
    //Pull coin data from this url
    const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en";
    //used for filtering 
    const [query, setQuery] = useState("");

    //Pulls coin data from our API
    useEffect(() => {
        async function getCoins() {
            let response = await axios.get(apiUrl);
            setCoinData(response.data);
            console.log(response.data);
        }
        getCoins()
    }, [])

    return (
        <div className="container ">
            <h2 className="text-center mb-4">Top 20 Crypto Currencies</h2>
            {/*}This is a form which uses bootstrap. Purpose is to filter the many coins we have pulled{*/}
            <form>
                <InputGroup>
                    <Form.Control onChange={(e) => setQuery(e.target.value)} placeholder="Filter crypto"></Form.Control>
                </InputGroup>
            </form>
            <div className="container cryptoContainer rounded">           {
                //use filter method with query to narrow down list of coins
                coinData.filter((i) => {
                    return query.toLowerCase() === "" ? i : i.id.toLowerCase().includes(query)
                }).map(function (i, index) {
                    return (
                        <ShowCrypto image={i.image} name={i.name} price={i.current_price} dailyPercentage={i.price_change_percentage_24h} marketCap={i.market_cap_rank} key={i.id} />
                    )
                })
            }
            </div> 
        </div>
    )
}

export default GetCrypto