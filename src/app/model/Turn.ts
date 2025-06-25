import { GameModel } from "./Game";

export interface TurnModel {
    id: number,
    turns: number,
    gameId: GameModel
}