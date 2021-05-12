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
            playerArr.push(player);
        }
        
        let players = JSON.stringify(playerArr);
        
        if(!storage.getItem("players")){
            storage.setItem("players", players);
        }else{
            storage.removeItem("players");
            storage.setItem("players", players);
        }
        
        let size = document.querySelector("#size").value;
        if(!storage.getItem("board")){
            storage.setItem("board", size);
        }else{
            storage.removeItem("board");
            storage.setItem("board", size);
        }

        window.location.href = "./index.html";
    }
   
    let submit = document.querySelector("#submit");
    submit.addEventListener("click", createGame);
}

init();
 
 
