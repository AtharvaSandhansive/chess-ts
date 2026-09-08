//result.ts

import {
    type GameStatus
} from "../data/gameState"
import "./result.css"

export class Result{

    private onPlayAgain: () => void;
    private onMainMenu: () => void;

    constructor(onPlayAgain: () => void, onMainMenu: () => void){
        this.onPlayAgain = onPlayAgain;
        this.onMainMenu = onMainMenu;
    }

    public show(status:GameStatus, winner?:string):void{
        const result = document.createElement("div");
        result.id = "result";

        const box = document.createElement("div");
        box.id = "result-box";

        const title = document.createElement("h1");
        
        if (status==="checkmate"){
            title.textContent = `${winner} WINS!`;
        }
        else if (status === "stalemate"){
            title.textContent = "STALEMATE!";
        }

        box.appendChild(title);

        const playAgainButton = document.createElement("button");
        playAgainButton.textContent = "Play Again?";
        playAgainButton.addEventListener("click", () => {this.onPlayAgain()});
        box.appendChild(playAgainButton);

        const mainMenuButton = document.createElement("button");
        mainMenuButton.textContent = "Main Menu";
        mainMenuButton.addEventListener("click", ()=>{this.onMainMenu()});
        box.appendChild(mainMenuButton);
        
        result.appendChild(box);

        const app = document.getElementById("app");
        if (!app) {throw new Error("no app :(")};
        app.appendChild(result);
    }
}