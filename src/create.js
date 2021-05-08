import Player from "./components/player.js";
 
function init() {
    let storage = localStorage;
    function createGame(){
        let name, color, player, playerArr = [];
        for(let i = 1; i <= 2; i++){
            if(i === 1){
                name = document.querySelector("#one-name");
                color = document.querySelector("#one-color");
            }else{
                name = document.querySelector("#two-name");
                color = document.querySelector("#two-color");
            }
       
            player = new Player(i, name.value, color.value, 0, {});
            playerArr.push(JSON.stringify(player));
        }
    
        if(!storage.getItem("players")){
            storage.setItem("players", playerArr);
            console.log(localStorage);
        }else{
            storage.removeItem("players");
            storage.setItem("players", playerArr);
            console.log(localStorage);
        }
        
        let boardSize = document.querySelector("#size").value;
        if(!storage.getItem("board")){
            storage.setItem("boardSize", boardSize);
            console.log(localStorage);
        }else{
            storage.removeItem("boardSize");
            storage.setItem("boardSize", boardSize);
            console.log(localStorage);
        }
        window.location.href = "./index.html";
    }
   
    let submit = document.querySelector("#submit");
    submit.addEventListener("click", createGame);
}

init();
 
 
