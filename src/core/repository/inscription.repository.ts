import { IInscription } from "../models/inscription.model";

export interface IInscriptionRepository {
  create(inscription: IInscription): Promise<IInscription>;
  update(inscription: IInscription): Promise<IInscription>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<IInscription>;
  findByName(userName: string): Promise<IInscription>;
  findAllByType(type: string): Promise<IInscription[]>;

  findAll(): Promise<IInscription[]>;
}
