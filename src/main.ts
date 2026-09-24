import { GameState } from "./data/gameState";
import { Engine } from "./engine/engine";
import { AIModule } from "./modules/ai";
import { Interface } from "./ui/interface";
import {Menu} from "./ui/menu";

const menu:Menu = new Menu(startLocalGame, startVsComputer);
menu.show();

function startLocalGame():void{
    menu.hide();
    const gameState:GameState = new GameState();
    const engine:Engine = new Engine(gameState);
    createBoard(engine, gameState);
}

function startVsComputer():void{

    menu.hide();
    const gameState:GameState = new GameState();
    const engine:Engine = new Engine(gameState);
    createBoard(engine, gameState);

    const ai = new AIModule(engine, gameState);

    engine.setTurnListener((colour) => {
        if (colour !== "black") {return;}
        console.log("AI'S TURN");
        const aiMove = ai.chooseMove();
        if (!aiMove) {return;}
        engine.makeMove(aiMove, true);
        }
    );
}

function createBoard(engine:Engine, _gameState:GameState):void{
    
    //create app
    const app = document.getElementById("app");
    if (!app){throw new Error("no app");}
    
    //create board and append to app
    const board = document.createElement("div");
    board.id = "board";
    app.appendChild(board);

    // Generate the board
    for (let y = 7; y >= 0; y--) {
        for (let x = 0; x < 8; x++) {

            const square = document.createElement("div");

            square.classList.add("square");

            square.dataset.x = x.toString();
            square.dataset.y = y.toString();

            if ((x + y) % 2 === 0) {
                square.classList.add("light");
            } else {
                square.classList.add("dark");
            }

            board.appendChild(square);
        }
    }

    // Create the UI
    const ui = new Interface(engine, board, playAgain, showMainMenu);

    engine.setGameStatusListener((status) => {ui.handleGameStatus(status)});

    // Give every square one click handler
    const squares = board.querySelectorAll<HTMLElement>(".square");
    squares.forEach(square => {

        square.addEventListener("click", () => {

            const x = Number(square.dataset.x);
            const y = Number(square.dataset.y);

            console.log("Clicked:", x, y);

            ui.SelectSquare(x, y);
        });

    });
}

function playAgain():void{
    const app = document.getElementById("app");
    if (!app){throw new Error("no app");}

    app.replaceChildren();
    startLocalGame();
}

function showMainMenu(): void {
    const app = document.getElementById("app");

    if (!app) {throw new Error("App element not found");}

    app.replaceChildren();

    menu.show();
}

