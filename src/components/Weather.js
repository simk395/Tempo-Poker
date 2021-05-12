export default class Weather{
    constructor(lat, lng, city, country, temp = null, type = null){
        this.lat = lat;
        this.lng = lng;
        this.city = city;
        this.country = country;
        this.temp = temp;
        this.type = type;
    }
    async getWeather(){
        // remove secret
        try{
            const res = await fetch(`https://ancient-eyrie-20832.herokuapp.com/https://api.darksky.net/forecast/1c0aeb3e686000cec99e0669d0da89bb/${this.lat},${this.lng}`)
            const data = await res.json();
            this.temp = Math.floor(data.currently.temperature);
            this.type = data.currently.icon;
            return this;
        }catch(err){
            alert("Error: Failed to fetch weather data.");
        }
    }
}