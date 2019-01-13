const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '1f588b2fd648baca2406397abc044c64';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('ve',{weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  console.log(city);
  request(url, function (err, response, body) {
    if(err){
      res.render('ve', {weather: null, error: 'Error, please try again'});
    } else {
      console.log('hello');
      let weather = JSON.parse(body)
   // console.log(weather);
      if(weather.main == undefined){
        res.render('ve', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        console.log(weatherText);
        res.render('ve', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})