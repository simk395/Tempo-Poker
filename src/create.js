import Player from "./components/player.js";

function init() {
    // database
    let storage = localStorage;

    // create the game
    function createGame(){
        let name, color, player, playerArr = [];

        // grab inputted data from the textboxes
        // and generate players with the data
        for(let i = 1; i <= 2; i++){
            if(i === 1){
                name = document.querySelector("#one-name");
                color = document.querySelector("#one-color");
            }else{
                name = document.querySelector("#two-name");
                color = document.querySelector("#two-color");
            }
            
            player = new Player(i, name.value, color.value, 0, {cards:{},foods:{}});
            playerArr.push(player);
        }
        
        let players = JSON.stringify(playerArr);
        
        // save all player data into the database
        // if they already exist the overwrite them
        if(!storage.getItem("players")){
            storage.setItem("players", players);
        }else{
            storage.removeItem("players");
            storage.setItem("players", players);
        }
        
        // get board size
        // save board size into database
        // if it exists then overwrite it
        let size = document.querySelector("#size").value;
        if(!storage.getItem("board")){
            storage.setItem("board", size);
        }else{
            storage.removeItem("board");
            storage.setItem("board", size);
        }

        // push users to the game page
        window.location.href = "./index.html";
    }

    // display the size of the board the users are selecting
    function handleSize(e){
        document.querySelector("#size-label").innerText = `Size: ${e.target.value}`;
    }

    // change the colors of the avatars to user selection
    function handleColor(e){
        console.log(e.target.id);
        let img;
        if(e.target.id == "one-color") img = document.querySelector("#one-img");
        else img = document.querySelector("#two-img");
        img.src = `images/playerIcons/${e.target.value}.png`;
    }

    // add the event listeners to the form
    function addListeners(){
        let range = document.querySelector("#size");
        range.addEventListener("input", handleSize);

        let color = document.querySelector("#one-color");
        let color2 = document.querySelector("#two-color");
        color.addEventListener("change", handleColor);
        color2.addEventListener("change", handleColor);

        let submit = document.querySelector("#submit");
        submit.addEventListener("click", createGame);
    }
   
    addListeners();
}

init();

