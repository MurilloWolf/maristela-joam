import { IUser } from "./user.model";

export interface IInscription {
  id: string;
  campingId: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date | null;
}
