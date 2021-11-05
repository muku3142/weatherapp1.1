/* Empty JS object to act as endpoint for all routes */
let projectData = {};

/* Express to run server and routes */
const express = require('express');
/* Start up an instance of app */
const app = express();

/* Dependencies */
const cors = require('cors');
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, ()=>{
    console.log(`running on localhost: ${port}`);
});

// GET route
app.get('/getWeather', (req,res)=>{
    res.send(projectData);
});

// POST route
app.post('/postWeather', (req,res)=>{
    /*
    let weatherData= req.body;
    let newWeather= {
        temperature: weatherData.temperature,
        date: weatherData.date,
        userResp: weatherData.userResp

    }
   projectData.push(newWeather);
     */
    projectData = {...req.body}
    res.send();
});

//----------------------------------------------------------------

