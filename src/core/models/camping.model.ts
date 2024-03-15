import { IInscription } from "./inscription.model";

export type CapingStatus = "open" | "closed" | "finished" | string;
export interface ICamping {
  id: string;
  number: number;
  year: number;
  statusWorkTeam: CapingStatus;
  statusCamper: CapingStatus;
  inscriptionsWorkTeam: IInscription[];
  inscriptionCamper: IInscription[];
  inscriptionCamperStartDate: Date;
  inscriptionCamperEndDate: Date;
  inscriptionWorkTeamStartDate: Date;
  inscriptionWorkTeamEndDate: Date;
  campingStartDate: Date;
  campingEndDate: Date;
  created_at: Date;
  updated_at: Date | null;
}
