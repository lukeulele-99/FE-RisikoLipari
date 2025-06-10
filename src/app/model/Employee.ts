import { GameModel } from "./Game"

export interface Employee {
    id : number,
    role: "Manager" | "Senior" | "Consultant"
    total: number,
    occupied: number,
    available: number
    id_game: GameModel
}