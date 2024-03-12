import { ICamping } from "@/core/models/camping.model";
import camping from "@/core/db/camping.table";
import { ICampingRepository } from "@/core/repository/camping.repository";
import errorDictinoray from "@/core/errors/dictinoray";

export default class InMemoryCampingRepository implements ICampingRepository {
  private campings: ICamping[];

  constructor(campings: ICamping[] = []) {
    this.campings = campings;
  }

  create(camping: ICamping): Promise<ICamping> {
    return new Promise((resolve) => {
      this.campings.push(camping);
      resolve(camping);
    });
  }
  update(camping: ICamping): Promise<ICamping> {
    return new Promise((resolve) => {
      const index = this.campings.findIndex((c) => c.id === camping.id);
      this.campings[index] = camping;
      resolve(camping);
    });
  }
  delete(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const index = this.campings.findIndex((c) => c.id === id);
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
