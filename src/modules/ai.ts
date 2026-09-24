//ai.ts
import { GameState } from "../data/gameState";
import { Engine } from "../engine/engine";
import { type Colour, type Unit , type Move} from "../data/data";

export class AIModule {

    private engine: Engine;
    private gameState: GameState;
    private colour:Colour = "black";

    constructor(engine: Engine, gameState: GameState) {
        this.engine = engine;
        this.gameState = gameState;
    }

    public chooseMove():Move | undefined {
        const legalMoves = this.engine.getLegalMoves(this.colour);

        if (legalMoves.length === 0){return undefined;}
        
        //we evaluate the best move
        let bestMove = legalMoves[0];
        let bestScore = -Infinity;

        /* We store the bestMove and bestScore by looping over the legal moves*/

        for (const move of legalMoves){
            const state = this.engine.makeMove(move, false);
            const score = this.minimax(1, false);
            this.engine.undoMove(state);
            console.log(
                "Move:",
                move.from,
                "→",
                move.to,
                "Score:",
                score
            );
             if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }

        console.log(
                "Best Move:",
                bestMove.from,
                "→",
                bestMove.to,
                "Score:",
                bestScore
        );

        this.endMove();
        
        return bestMove;
    }

    private getPieceValue(unit: Unit): number {

        switch (unit.pieceType) {
            case "pawn": return 1;
            case "knight": return 3;
            case "bishop": return 3;
            case "rook": return 5;
            case "queen": return 9;
            case "king": return 0;
        }
    }

    private evaluateMove(move:Move):number{
        const state = this.engine.makeMove(move,false);
        const score = this.evaluatePosition();
        this.engine.undoMove(state);
        return score;
    }

    private evaluatePosition():number{
        let score = 0;
        const units = this.gameState.getUnits();

        for (const unit of units) {
            const materialValue = this.getPieceValue(unit);
            const positionValue = this.getPositionValue(unit);

            const value = materialValue + positionValue;

            if (unit.colour === this.colour) {
                score += value;
            } else {
                score -= value;
            }
        }

        const myMobility = this.getMobilityValue(this.colour);
        const opponentColour: Colour =this.colour === "white" ? "black" : "white";

        const opponentMobility = this.getMobilityValue(opponentColour);

        score += myMobility - opponentMobility;

        return score;
    }

    //minmax
    private minimax(depth: number, maximizing: boolean): number {

        if (depth === 0) {
            return this.evaluatePosition();
        }

        const colour: Colour =maximizing ? this.colour : "white";

        const legalMoves = this.engine.getLegalMoves(colour);

        if (maximizing) {

            let bestScore = -Infinity;

            for (const move of legalMoves) {

                const state = this.engine.makeMove(move, false);

                const score = this.minimax(depth - 1, false);

                this.engine.undoMove(state);

                if (score > bestScore) {bestScore = score;}
            }

            return bestScore;
        }

        let bestScore = Infinity;

        for (const move of legalMoves) {

            const state = this.engine.makeMove(move, false);

            const score = this.minimax(depth - 1, true);

            this.engine.undoMove(state);

            if (score < bestScore) {bestScore = score;}
        }

        return bestScore;
    }

    //get positional values
    private getPositionValue(unit:Unit):number{
        if (unit.pieceType !== "knight") {
            return 0;
        }

        const knightTable: number[][] = [
        [-4, -3, -2, -2, -2, -2, -3, -4],
        [-3, -1,  0,  1,  1,  0, -1, -3],
        [-2,  0,  1,  2,  2,  1,  0, -2],
        [-2,  1,  2,  3,  3,  2,  1, -2],
        [-2,  1,  2,  3,  3,  2,  1, -2],
        [-2,  0,  1,  2,  2,  1,  0, -2],
        [-3, -1,  0,  1,  1,  0, -1, -3],
        [-4, -3, -2, -2, -2, -2, -3, -4]
        ];

        return knightTable[unit.position.y][unit.position.x];
    }

    private getMobilityValue(colour:Colour): number {
        const legalMoves = this.engine.getLegalMoves(colour);

        return legalMoves.length;
    }

    public testMoveEvaluation(move:Move):number {
        return this.evaluateMove(move);
    }
    private endMove():void{this.engine.finishMove();}
}