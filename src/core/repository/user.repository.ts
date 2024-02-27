import { IUser } from "../models/user.model";

export interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | Error>;
  findByName(name: string): Promise<IUser>;
  findByDocument(document: string): Promise<IUser>;

  findAll(): Promise<IUser[]>;
}
