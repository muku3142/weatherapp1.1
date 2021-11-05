/* Global Variables */
//------------------------------------------------------------------------------------------------------------
//Selecting Elements
//zipcode
const zipCode= document.getElementById('zip');
//feeling
const content= document.getElementById('feelings');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//------------------------------------------------------------------------------------------------------------
/* Main Code */
//Event Listener for submit button
document.getElementById('generate').addEventListener('click',async ()=>{
    //API from openweathermap.org
    const apiKey = '17f88db7ada45309f24c14ff0c1e336f';
    const baseURL= `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}`;
    /*Chain Promise */
    getWeatherData(baseURL,).then( (data)=> {
        postData('/postWeather',{ date: newDate, temp: data, content: content.value})
        return data;
    }).then((newData)=>{

        document.getElementById('date').innerHTML=newDate;
        document.getElementById('temp').innerHTML=newData;
        document.getElementById('content').innerHTML=content.value;

    })
})
//-------------------------------------------------------------------------------------------------------------
/* Async function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch('postWeather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    //fetching new data by get request
    try {
        const nodeRes= await fetch('/getWeather')
        const newData= await nodeRes.json();
        return(newData)
    }catch(e) {
        console.log("error")
    }
}
//-------------------------------------------------------------------------------------------------------------
/* Async function to GET data from weather API */
const getWeatherData = async (baseURL)=>{
    const res = await fetch(baseURL);
    try {
        const wData = await res.json();
        const temp= wData.main.temp;
        console.log(wData.main)
        return (temp);
    }  catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }

    console.log(res);
}
//---------------------------------------------------------------------------------------------------------------


