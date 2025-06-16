import { CompanyModel } from "./Company"
import { GameModel } from "./Game"

export interface Employee {
    id : number,
    role: "Manager" | "Senior" | "Consultant"
    id_game: GameModel,
    id_company: CompanyModel,
    turnoDestaffing: number
}