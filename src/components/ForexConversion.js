/*
Component:ForexConversion.js
Student: Denis O Regan
Course : HDip in Web development
Module: Advanced client side development

component description:
This component will convert price in euro to diferent currencies selected by the user, this 
component will also display 12 months of historical data for the price currency
There is a limitation in the api that only allows a base currency of euro for the free subscription
*/



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock'
import LineChart from 'highcharts-react-official'
import forexImage from '../assets/forex_narrow.jpg'

function ForexConversion(){
    const initialValue = 1;//initial value to convert
   
    const[baseCurrency,setBaseCurrency] = useState("EUR - Euro")//initialise base currency to euro
    const[baseCurrencySymbol,setBaseCurrencySymbol] = useState("EUR") //symbol will be used for api
    const[priceCurrency,setpriceCurrency] = useState("USD - United States Dollar")
    const[priceCurrencySymbol,setpriceCurrencySymbol] = useState("USD")
    const[valueToConvert, setValueToConvert] = useState(initialValue);//value to be converted
    const[graphCurrency, setGraphCurrency] = useState("") //to update currency on line chart

    const[latestPrices,setLatestPrices] = useState([]) //latest currency prices
    
    //start and end date of historical prices for linechart
    const[startDate,setStartDate] = useState("")
    const[endDate,setEndDate] = useState("")

    const[timeSeriesDates,setTimeSeriesDates] = useState([]);//for charting dates
    const[timeSeriesPrices,setTimeSeriesPrices] = useState([])//for charting prices



    // Get latest proces and timeseriesdata on loading
    useEffect(() => {
        getlatestPrices(); //get latest currency prices
        setDates()//set start and end dates for time series data
        
      
        
        }, []);


      //set dates for the time series request
       async function setDates(){

        //set start Date to 12 months ago, endDate to todays date
        const todaysDate = new Date();
        const month = String(todaysDate.getUTCMonth()+1).padStart(2,'0');//pad result to always give 2 digits for date format
        const year = todaysDate.getFullYear();
        const previousYear = todaysDate.getFullYear()-1;
        const day = String(todaysDate.getUTCDate()).padStart(2,'0')
        console.log("Date month : "+ previousYear +"-"+month+'-'+ day)

        setStartDate(previousYear +"-"+month+'-'+ day);
        setEndDate(year +"-"+month+'-'+ day);



      
      }
      
      async function getTimeSeriesData() {
        

        try {

      //options for querying api - https://rapidapi.com/principalapis/api/currency-conversion-and-exchange-rates
    
    const timeSeriesOptions= {
        method: 'GET',
        url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/timeseries',
        params: {
          start_date: startDate,
          end_date: endDate,
          from: 'EUR',
          to: priceCurrency
        },
        headers: {
          'X-RapidAPI-Key': '6a41346b5amsh2cb670067fd9a61p15e360jsn07ec80331e8f',
          'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
      };

            
          const response = await axios.request(timeSeriesOptions);

            
            // Extract entries from returned object
            var timeSeries = Object.entries(response.data.rates);
        
            
            // Format the data
            const formattedTimeSeriesData = timeSeries.map(([date, prices]) => ({
                date:date,
                value: prices[priceCurrencySymbol],
            }));

            //sort data by date ascending as the api returns data and values unsorted
            const sortedArray=[...formattedTimeSeriesData].sort((a,b)=> a.date > b.date? 1 :-1, );
         
           

            //split pair into 2 arrays for chart
           const dates = sortedArray.map(date =>date.date);
           const prices = sortedArray.map(price=>price.value);

            setTimeSeriesDates(dates);
            setTimeSeriesPrices(prices);

            setGraphCurrency(priceCurrency);   
            console.log("start-date "+ startDate);
            console.log("end-date: "+ endDate)         
                      
            } catch (error) {
          console.error('Error:', error);
        }
        
      }

    
      
      //async function retrieves conversion rate from api
      //options for querying api code example - https://rapidapi.com/principalapis/api/currency-conversion-and-exchange-rates
      async function getlatestPrices() {
        const requestOptions= {
            method: 'GET',
            url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest',
          
            params: {    
              from: 'EUR',
              to: priceCurrencySymbol
            },
            headers: {
              'X-RapidAPI-Key': '6a41346b5amsh2cb670067fd9a61p15e360jsn07ec80331e8f',
              'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
            }
          };

        try {
     
          const response = await axios.request(requestOptions);

            
            console.log("response")
            console.log(response.data)
            setLatestPrices(response.data.rates)
    
            
                  

        } catch (error) {
            console.error('Error:', error);
          }
       
      }
      //variable exchangeR for exchange rate , I found using a setState resulted in a delay 
      // updating the converted currency value
      const exchangeR = latestPrices[priceCurrencySymbol];
 
    /* Currency List */
    const currencyList = [
        "AUD - Australian Dollar",
        "CAD - Canadian Dollar",
        "CHF - Swiss Franc",
        "CNY - Chinese Yuan",
        "GBP - British Pound Sterling",
        "HKD - Hong Kong Dollar",
        "JPY - Japanese Yen",
        "NOK - Norwegian Krone",
        "NZD - New Zealand Dollar",
        "RUB - Russian Ruble",
        "SEK - Swedish Krona",
        "TRY - Turkish Lira",
        "USD - United States Dollar"
        
        ];

    const currencyTable = {
        AUD: "AUD - Australian Dollar",
        BRL: "BRL - Brazilian Real",
        CAD: "CAD - Canadian Dollar",
        CHF: "CHF - Swiss Franc",
        CNY: "CNY - Chinese Yuan",
        GBP: "GBP - British Pound Sterling",
        HKD: "HKD - Hong Kong Dollar",
        INR: "INR - Indian Rupee",
        JPY: "JPY - Japanese Yen",
        KRW: "KRW - South Korean Won",
        MXN: "MXN - Mexican Peso",
        NOK: "NOK - Norwegian Krone",
        NZD: "NZD - New Zealand Dollar",
        RUB: "RUB - Russian Ruble",
        SEK: "SEK - Swedish Krona",
        TRY: "TRY - Turkish Lira",
        USD: "USD - United States Dollar"
        

    }
 
      
    
    /* function handleBaseCurrency was written to handle the user changing the base
    currency, however it was found this api only provides a base currency of euro
    */
    function handleBaseCurrency(e){
        e.preventDefault()  
        getlatestPrices();
    }

    //function handlePriceCurrency will set setPriceCurrency & priceCurrencySymbol
    function handlePriceCurrency(e){
        setpriceCurrency(e.target.value)
        //console.log("price test: " + priceCurrency)
        //console.log("end-date: " + endDate)

        //get symbol of price currency, this will be passed to API to retrieve data 
        const currencyKeys = Object.keys(currencyTable);
        const currencyToFind = e.target.value;
        const priceSymbol = currencyKeys.find(function(key){
          return currencyTable[key] === currencyToFind; 
        })
        setpriceCurrencySymbol(priceSymbol);
        //getTimeSeriesData();
        getlatestPrices();      
    }



     function handleConvertValue(e){

        //input validation - checks if input is a number
        if(isNaN(e.target.value)){
          console.log("is not a number")
          
        }
        else{
          setValueToConvert(e.target.value);
        }
        
       
       
    }

   
        
    
    //function for debugging
    function showCurrentCurrency(){
        console.log("New Base Currency:" + baseCurrency)
        console.log("New Base Currency symbol:" + baseCurrencySymbol)
        console.log("New price Currency:" + priceCurrency)
        console.log("New price Currency symbol:" + priceCurrencySymbol)
        console.log(" ")
    }

    //Line chart Configuration
      const graphConfig= {

        title: {
            text: 'Historical Prices 12 month : ' + graphCurrency,
            align: 'left'
        },
    
        subtitle: {
            text: '',
            align: 'left'
        },
    
        yAxis: {
            title: {
                text: 'Prices'
            }
        },
    
        xAxis: {categories:timeSeriesDates,            
        }, 
        series:[{
            data: timeSeriesPrices,
          }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    }
    




return(<div className="container-fluid">
            <div className="row">
     
            <img src={forexImage} class="img-fluid" alt="forex Image"/>
            
            
            </div>
    	    
            <div className="row">
                
           

                <div className="conversion-container-group">
                        <div className="conversion-container">
                            <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handleBaseCurrency} >
                                <option selected>{baseCurrency}</option>
                                
                            </select>
                            <input className ="conversion-input" type="number" value={valueToConvert} onChange={handleConvertValue} defaultValue={initialValue} />

                        </div>
                        <span className="currency-switch-btn"></span>

                        

                        <div className="conversion-container">
                            <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handlePriceCurrency}>
                                <option selected>{priceCurrency}</option>
                                {currencyList.map((currency, index) => (
                                    <option key={index}>{currency}</option>
                                ))}
                            </select>
                            <input className ="conversion-input" type="number" value={valueToConvert*exchangeR}  />

                        </div>
                        
                </div>
                <div className="chart">
                   <button className="btn btn-primary" onClick={getTimeSeriesData}>Get historical prices  </button>
                  <div>   
                    <LineChart highcharts = {Highcharts} options={graphConfig} />             
                  </div>       
                  
                  
                </div>
                

            </div>

        </div>)  
          
}
export default ForexConversion