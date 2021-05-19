export default class Dice{
    // roll the dice
    roll(player, weathers, size){
        try{
             // determine how many weather sections are on the board
            const chunk = size / weathers.length;
            // determine which section the player is in
            const index = Math.floor(player.space/chunk);
            // get the weather for the following section
            const weather = weathers[index];
            // simulate a roll from 2 dies combined
            const roll = Math.ceil(Math.random()*12);
            let bonus;

            // check weather to see if player gets any bonuses
            switch(weather.type){
                case 'clear-day': bonus = 2; break;
                case 'clear-night': bonus = 2; break;
                case 'partly-cloudy-day': bonus = 1; break;
                case 'partly-cloudy-night': bonus = 1; break;
                case 'rain': bonus = -1; break;
                case 'snow': bonus = -2; break;
                default: bonus = 0; break;
            }
            
            // if the roll is lower than 0 then the player will not move
            if(roll + bonus + player.speed < 0){
                return 0;
            }
            
            console.log(roll+bonus+player.speed);
            return roll + bonus + player.speed;
        }catch(err){
            throw new Error("Failed to roll.")
        }
       
    }
}