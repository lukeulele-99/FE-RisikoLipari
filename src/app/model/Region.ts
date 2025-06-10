//interfaccia per passaggio dati
import { CompanyModel } from "./Company";

export interface RegionModel {
  id: number;
  name: string;
  company: CompanyModel[]; 
  gameId: number
}
