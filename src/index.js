import { cities as db }  from "./db/cities.js";
import Weather from "./components/Weather.js";
import Dice from "./components/Dice.js";
import Player from "./components/player.js";
import Deck from "./components/Deck.js"

const storage = localStorage;
const state = {}

// create players
function generatePlayers(){
    const playerArr = JSON.parse(storage.getItem("players"));
    return playerArr.map( (data, i) => new Player(i, data.name, data.color, parseInt(data.space), data.items));
}

//get weather data into an array
async function generateWeather(){
    const size = parseInt(storage.getItem("board"));
    const citySize = db.length;
    const numOfForecasts = Math.floor(size/50);
    const weathers = [];

    for(let i = 0; i < numOfForecasts; i++){
        let val = Math.floor(Math.random()*citySize);
        let city = db[val];
        let forecast = new Weather(city.lat, city.lng, city.city, city.country);
        await forecast.getWeather();
        weathers.push(forecast);
    } 
    
    let data = JSON.stringify(weathers);
    storage.setItem("weathers", data);
    return weathers;
}

// make weather visible to players
function appendWeather(weather){
    const weatherContainer = document.querySelector("#weather");

    const col = document.createElement("div");
    col.className = 'col';

    const container = document.createElement("div");
    container.className = "d-flex flex-row justify-content-around";

    const title = document.createElement("p");
    title.innerText = `${weather.city}, ${weather.country}`;

    const icon = document.createElement("i");
    switch(weather.type){
        case 'clear-day': icon.className = 'fas fa-sun'; break;
        case 'clear-night': icon.className = 'fas fa-moon'; break;
        case 'partly-cloudy-day': icon.className = 'fas fa-cloud-sun'; break;
        case 'partly-cloudy-night': icon.className = 'fas fa-cloud-moon'; break;
        case 'rain': icon.className = 'fas fa-cloud-rain'; break;
        case 'snow': icon.className = 'fas fa-snowflake'; break;
        default: icon.className = 'fas fa-cloud'; break;
    }

    const temperature = document.createElement("p");
    temperature.innerText = weather.temp;

    container.append(icon, temperature);
    col.append(title, container);
    weatherContainer.append(col);
}


//signal the beginning of a turn
async function beginTurn(){
    const {players, turn} = state;
    const player = players[turn];
    const inventory = document.querySelector(`.inventory[data-bag="${player.id}"]`);
    console.log(inventory);
    inventory.addEventListener("click", (e) => handleCard(e, player, inventory));
    appendRoll(player);
}

function handleCard(e, player, inventory){
    const { cards } = state;
    const code = e.target.dataset.card;
    if(!code) return;

    const deselect = cards.findIndex(card => cards == code);
    if(deselect !== -1) state.cards = cards.filter(card => card !== code);
    else if(cards.length >= 5) return;
    else state.cards.push(code);

    if(state.cards.length) appendUse(inventory);
    else removeUse();
}

function appendUse(inventory){
        inventory.parentElement.append(use);

    // if(cards.length){
    //     if(!use){
    //         const use = document.createElement("button");
    //         use.innerText = "Use";
    //         use.className = "use";
    //         inventory.parentElement.append(use);
    //         use.addEventListener("click", () => {
    //             let val = player.useCard(cards);
    //             if(val){
    //                 console.log(val);
    //                 cards.forEach(card => removeCard(card));
    //                 cards = [];
    //             }else{
    //                 alert("invalid card combination");
    //             }
    //         });
    //     }
    // }else{
    //     use.remove();
    // }
}

function removeUse(){
    const btn = document.querySelector("#use");
    btn.remove();
}

// remove card images that were used
function removeCard(card){
    const img = document.querySelector(`.card[data-card="${card}"]`);
    img.remove();
}

// add the roll playing to respective players turn
function appendRoll(player){
    const inventory = document.querySelector(`.inventory[data-bag="${player.id}"]`);
    const btn = document.createElement("button");
    btn.innerText = "roll";
    btn.className = "btn";
    btn.id = "roll"
    btn.addEventListener("click", e => handleDice(player));
    inventory.after(btn);
}

//handle rolling the dice
function handleDice(player){
    const {weathers, dice} = state;
    const size = parseInt(storage.getItem("board"));
    const distance = dice.roll(player, weathers, size);
    player.move(distance);
    advance(player);
    endTurn(player, distance);
}

// slide the player forward
function advance(player){
    const size = parseInt(storage.getItem("board"));
    const playerIcon = document.querySelector(`.player[data-icon="${player.id}"`);
    const pct = Math.floor((player.space / size)*100);
    playerIcon.style.transform = `translateX(calc(${pct}vw - 50px))`;
}

// end the player's turn
async function endTurn(player, distance){
    const {players, deck, turn} = state;
    const card = await deck.draw(deck.id);

    appendLog(distance, player);
    player.addCard(card);
    appendCard(player, card);
    removeRoll();
    removeSelect(player);
    if(turn + 1 === players.length) state.turn = 0;
    else state.turn++;
    beginTurn()
}

// remove roll button for player
function removeRoll(){
    const btn = document.querySelector("#roll");
    btn.remove();
}

// create copy to remove listener on inventory
function removeSelect(player){
    const inventory = document.querySelector(`.inventory[data-bag="${player.id}"]`);
    const copy = inventory.cloneNode(true);
    inventory.replaceWith(copy);
}

// add activity to textarea
function appendLog(d, player){
    const log = document.querySelector("#log");
    log.innerHTML = log.innerHTML + `\n${player.name} moved ${d} spaces. Now at ${player.space}.`;
    log.scrollTop = log.scrollHeight;
}

// visually add card to respective player's inventory
function appendCard(player, card){
    const inventory = document.querySelector(`.inventory[data-bag="${player.id}"]`);
    const img = document.createElement("img");
    img.dataset.card = card.code;
    img.className = "card";
    img.src = card.image;
    inventory.append(img);
}

// main
async function main(){
    const players = generatePlayers();
    const deck = await new Deck().getDeck();
    const weathers = await generateWeather();
    weathers.forEach(weather => {
        appendWeather(weather);
    })
    const dice = new Dice();
    const turn = Math.floor(Math.random() * players.length);

    // initialize "state machine"
    state.players = players;
    state.deck = deck;
    state.weathers = weathers;
    state.dice = dice;
    state.turn = turn;
    state.cards = [];

    beginTurn();
}

main();