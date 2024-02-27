import { ICamping } from "../models/camping.model";
import { ICampingRepository } from "../repository/camping.repository";

export default class CampingCases {
  private campingRepository: ICampingRepository;

  constructor(campingRepository: ICampingRepository) {
    this.campingRepository = campingRepository;
  }

  async createCamping(camping: ICamping): Promise<ICamping> {
    return this.campingRepository.create(camping);
  }

  async updateCamping(camping: ICamping): Promise<ICamping> {
    return this.campingRepository.update(camping);
  }

  async deleteCamping(id: string): Promise<boolean> {
    return this.campingRepository.delete(id);
  }

  async findCampingById(id: string): Promise<ICamping> {
    return this.campingRepository.findById(id);
  }
}
