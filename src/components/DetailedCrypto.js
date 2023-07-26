import React from "react";
import MarketLogo from '../assets/Untitled design.png'

function DetailedCrypto(props) {
    return (
        //outputs coin name, image and symbol
        <div class="container mt-3 pt-3  cryptoContainer">
            <div class="coinInfoFlex">
                {/*}Div contains info on coin name, price{*/}
                <div>
                    <div class="coinHeading">
                        <img class="coinImg" src={props.image}></img>
                        <h3><span>{props.name}</span> <span class="coinSymbol">{props.symbol}</span></h3>
                    </div>
                    {/*}Outputs price and the daily percentage change dynamically depending on whether it's up or down{*/}
                    <p class="coinPrice">${props.price} <span class="dailyChange">{props.dailyPercentage > 0 ? (<span className="textGreen">{props.dailyPercentage}%</span>) :
                        (<span class="textRed">{props.dailyPercentage}%</span>)}</span></p>
                </div>
                {/*}Div contains additional market info{*/}
                <div class="marketInfo">
                    <div class="coinHeading">
                        <img class="" src={MarketLogo}></img>
                        <h3>Market Info </h3>
                    </div>
                    <p>Market Rank <span class="marketData">#{props.marketRank}</span></p>
                    <p>Market Cap <span class="marketData">${props.marketCap}</span></p>
                    <p>All Time High <span class="marketData">${props.highest}</span></p>
                    <p>All Time Low <span class="marketData">${props.lowest}</span></p>
                </div>
            </div>
        </div>
    )
}

export default DetailedCrypto