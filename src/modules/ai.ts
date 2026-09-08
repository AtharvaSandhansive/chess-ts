//ai.ts

import { } from "../data/data";
import { GameState } from "../data/gameState";
import { Engine } from "../engine/engine";
import {filter} from "../engine/filters"


export class AIModule{
    private engine:Engine;
    private gameState: GameState;
    private _filter:filter;
    constructor(engine:Engine, gameState:GameState){
        this.engine = engine;
        this.gameState = gameState;
        this._filter = engine._filter;
    }
    
}