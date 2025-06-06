import { UserModel } from "./User";

export interface GameDTO {
    gameId: number,
    score: number,
    status: string,
    id_user : UserModel
}