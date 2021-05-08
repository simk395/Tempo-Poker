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
            return res.json();
        }catch(err){
            alert("Error: Failed to fetch weather data.");
        }
    }

    setTemp(temp){
        this.temp = temp;
    }

    setType(type){
        this.type = type;
    }
}