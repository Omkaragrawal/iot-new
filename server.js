"use strict"
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const https = require('https');
const path = require('path');
const axios = require('axios'); 
const compression = require('compression');

let Message =""

const newsApiKey = 'df040e95029945beb880b79a7193482c';

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('combined'));
app.use(compression('BROTLI_MODE_TEXT'));
app.use(express.static(path.join(__dirname, 'assets')));
app.listen(port, () => {console.log(`Our site is hosted on ${port}! If you donot know to open just go to browser and type (localhost:${port})`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/news', (req, res) => {
    axios.get('https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=' + newsApiKey,)
    .then((response) => {
        // console.log(response.data.articles);
        let data = response.data.articles.map(news => news.title)
        res.send(data);
    })
    .catch((error) => {
        console.log(error);
        res.send(error);
    });
});

app.get('/weather', (req,res) => {
    axios.get('https://api.darksky.net/forecast/2a08fb2e9c0b81ae9a5cd0022b2cf540/19.275634,72.884537')
    .then(resp => {
        res.send(resp.data);
    });
});

app.get('/messages', (req, res) => {
    axios.get('https://54e804af.ngrok.io')
    .then((response) => {
        Message = response.data;
    });

    res.send(Message);
})