import { IUser } from "./user.model";

type InscriptionType = "team work" | "camper";

export interface IInscription {
  id: string;
  campingId: string;
  user: IUser;
  type: InscriptionType;
  createdAt: Date;
  updatedAt: Date;
}
