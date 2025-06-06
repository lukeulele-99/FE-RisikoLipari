import { UserModel } from "./User";

export interface GameModel {
  id: number;
  score: number;
  status: string;
  id_user: UserModel;
}
