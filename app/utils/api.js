//api examples
//http://api.openweathermap.org/data/2.5/weather?q=CITY-NAME&type=accurate&APPID=YOUR-API-KEY

//http://api.openweathermap.org/data/2.5/weather?q=Dover&type=accurate&APPID=aecb73a0b30e35880f559fbd53ea9fc6

//http://api.openweathermap.org/data/2.5/forecast/daily?q=CITY-NAME&type=accurate&APPID=YOUR-API-KEY&cnt=5

//http://api.openweathermap.org/data/2.5/forecast/daily?q=dover&type=accurate&APPID=aecb73a0b30e35880f559fbd53ea9fc6&cnt=5

let axios = require('axios');

let id = 'aecb73a0b30e35880f559fbd53ea9fc6';

//make 5 day api call
function getWeather(value) {
  return axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + value + '&type=accurate&APPID=' + id + '&cnt=5')
    .then(function(weather) {
      return weather.data;
    })
}

module.exports = getWeather;