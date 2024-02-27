import { ICamping } from "../models/camping.model";

export interface ICampingRepository {
  create(camping: ICamping): Promise<ICamping>;
  update(camping: ICamping): Promise<ICamping>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<ICamping>;
  findAll(): Promise<ICamping[]>;
}
