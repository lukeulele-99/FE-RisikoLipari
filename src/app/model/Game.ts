//interfaccia per passaggio dati
import { UserModel } from "./User";

export interface GameModel {
  id: number;
  score: number;
  status: string;
  user: UserModel;
}
