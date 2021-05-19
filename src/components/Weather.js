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
        try{
            // Request data from the Dark Sky API through a proxy server. The data is parsed into an object to be accessible for Javascript.
            // log errors into the console upon a status that is not success (200)
            const res = await fetch(`https://ancient-eyrie-20832.herokuapp.com/https://api.darksky.net/forecast/key/${this.lat},${this.lng}`)
            if(res.status != 200) throw Error;
            const data = await res.json();
            this.temp = Math.floor(data.currently.temperature);
            this.type = data.currently.icon;
            return this;
        }catch(err){
            throw new Error("Failed to retrieve weather.")
        }
    }
}