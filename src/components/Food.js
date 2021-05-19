export default class Food{

    async getFood(food){
        try{
             // Request data from the Nuitritionix API through a proxy server. The data is parsed into an object to be accessible for Javascript.
            // log errors into the console upon a status that is not success (200)
            const url = `https://ancient-eyrie-20832.herokuapp.com/http://trackapi.nutritionix.com/v2/search/instant?query=${food}&branded=true&branded_food_name_only=true`;
            const res = await fetch(url, {
                headers:{
                    'x-app-id': '4bab44c9',
                    'x-app-key': 
                    'Content-Type': 'application/json',
                }
            })
            if(res.status != 200) throw Error;
            const data = await res.json();
            const common = data.common;
            const randomize = Math.floor(Math.random()*common.length);
            let item = common[randomize];
            if (!item) throw new Error;
            return item;
        }catch(err){
            throw new Error("Failed to retrieve food.")
        }
    }
}