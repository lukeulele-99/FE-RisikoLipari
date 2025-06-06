import { CompanyModel } from "./Company";

export interface RegionModel {
  id: number;
  nome: string;
  aziende: CompanyModel[]; // Relazione uno-a-molti con Company
}
