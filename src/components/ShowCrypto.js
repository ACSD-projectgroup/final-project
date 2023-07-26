import React from "react";


function ShowCrypto(props) {
    
    return (
        <div className="container pt-2 pb-2 mt-2">

            <div className="row  border-bottom rounded p-2 mt-4">
                {/*} Had to use inline css on this image, as style would not apply from app.css when image was inside row{*/}
                <img src={props.image} className="col coinImg" alt="logo of a crypto currency" style={{ maxWidth: "70px", maxHeight: "auto" }}></img>
                <p className="col textBold textCenter">{props.name} </p>
                <p className="col textCenter"><span class ="textBold">Price: </span>${props.price}</p>
                {/*}Conditionaly output text as either red or green{*/}
                {props.dailyPercentage > 0 ? (<p className="col textCenter"><span class ="textBold">24hr </span><span className="textGreen">{props.dailyPercentage}%</span></p>):
                (<p className="col textCenter"><span class ="textBold">24hr </span><span class="textRed">{props.dailyPercentage}%</span></p>)}
                <p className="col textCenter"><span class ="textBold">Market Rank: </span>{props.marketCap}</p>
            </div>
            <script>changeColor()</script>
        </div>

    )
}


export default ShowCrypto