import { IInscription } from "./inscription.model";

export interface ICamping {
  id: number;
  number: number;
  year: number;

  inscriptions: IInscription[];
  inscriptionStartDate: Date;
  inscriptionEndDate: Date;
  campingStartDate: Date;
  campingEndDate: Date;
}
