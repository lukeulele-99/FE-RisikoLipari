import { CompanyModel } from "./Company";

export interface RegionModel {
  id: number;
  name: string;
  company: CompanyModel[]; // Relazione uno-a-molti con Company
}
