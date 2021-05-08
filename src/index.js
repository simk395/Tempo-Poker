import { cities as db }  from "./db/cities.js";
import Weather from "./components/Weather.js";

async function generateWeather(){
    let storage = localStorage;
    
    let size = parseInt(storage.getItem("boardSize"));
    let numOfCities = db.length;
    let numOfForecasts = Math.floor(size/50);
    let weatherArr = [];
    for(let i = 0; i < numOfForecasts; i++){
        let val = Math.floor(Math.random()*numOfCities);
        let city = db[val];
        let forecast = new Weather(city.lat, city.lng, city.city, city.country);
        let data = await forecast.getWeather();
        forecast.setTemp(Math.floor(data.currently.temperature));
        forecast.setType(data.currently.icon);
        weatherArr.push(forecast);
    } 
    
    let weatherEle = document.querySelector("#weather");
    weatherArr.forEach(weather => {
        const divEle = document.createElement("div");
    })
}

function main(){
   generateWeather();
}

main();