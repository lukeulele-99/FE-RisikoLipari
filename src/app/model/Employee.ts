import { CompanyModel } from "./Company"
import { GameModel } from "./Game"

export interface Employee {
    id : number,
    role: "Manager" | "Senior" | "Consultant"
    gameId: number,
    companyId?: number,
    turnoDestaffing: number
}