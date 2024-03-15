import { ICamping } from "@/core/models/camping.model";
import { v4 } from "uuid";
import camping from "@/core/db/camping.table";
import { ICampingRepository } from "@/core/repository/camping.repository";
import errorDictinoray from "@/core/errors/dictinoray";

export default class InMemoryCampingRepository implements ICampingRepository {
  private campings: ICamping[];

  constructor(campings: ICamping[] = []) {
    this.campings = campings;
  }

  create(camping: Partial<ICamping>): Promise<ICamping> {
    camping.id = v4();
    camping.created_at = new Date();
    camping.updated_at = null;

    return new Promise((resolve) => {
      this.campings.push(camping as ICamping);
      resolve(camping as ICamping);
    });
  }
  update(camping: ICamping): Promise<ICamping> {
    return new Promise((resolve, reject) => {
      const index = this.campings.findIndex((c) => c.id === camping.id);

      if (index === -1) {
        reject(errorDictinoray.campingErrors.notFound);
      }

      camping.updated_at = new Date();

      this.campings[index] = camping;
      resolve(camping);
    });
  }
  delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const index = this.campings.findIndex((c) => c.id === id);
      if (index === -1) {
        reject(errorDictinoray.campingErrors.notFound);
      }
      this.campings.splice(index, 1);
      resolve(true);
    });
  }
  findById(id: string): Promise<ICamping> {
    return new Promise((resolve, reject) => {
      const camping = this.campings.find((c) => c.id === id);
      if (!camping) {
        return reject(errorDictinoray.campingErrors.notFound);
      }

      return resolve(camping);
    });
  }

  findAll(): Promise<ICamping[]> {
    return new Promise((resolve) => {
      resolve(this.campings);
    });
  }
}
