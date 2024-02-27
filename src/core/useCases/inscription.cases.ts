import { IInscription } from "../models/inscription.model";
import { ICampingRepository } from "../repository/camping.repository";
import { IInscriptionRepository } from "../repository/inscription.repository";

export class InscriptionCases {
  private inscriptionRepository: IInscriptionRepository;
  private campingRepository: ICampingRepository;

  constructor(
    inscriptionRepository: IInscriptionRepository,
    campingRepository: ICampingRepository
  ) {
    this.inscriptionRepository = inscriptionRepository;
    this.campingRepository = campingRepository;
  }

  async createInscription(inscription: IInscription): Promise<IInscription> {
    const camping = await this.campingRepository.findById(
      inscription.campingId
    );
    if (!camping) {
      throw new Error("Camping not found");
    }
    return this.inscriptionRepository.create(inscription);
  }

  async updateInscription(inscription: IInscription): Promise<IInscription> {
    return this.inscriptionRepository.update(inscription);
  }

  async deleteInscription(id: string): Promise<boolean> {
    return this.inscriptionRepository.delete(id);
  }

  async findInscriptionById(id: string): Promise<IInscription> {
    return this.inscriptionRepository.findById(id);
  }

  async findInscriptionByName(userName: string): Promise<IInscription> {
    return this.inscriptionRepository.findByName(userName);
  }

  async findAllInscriptions(): Promise<IInscription[]> {
    return this.inscriptionRepository.findAll();
  }

  async findInscriptionsByCampingId(campingId: string): Promise<IInscription> {
    return await this.inscriptionRepository.findById(campingId);
  }

  async findInscriptionsByType(status: string): Promise<IInscription[]> {
    const users =
      (await this.inscriptionRepository.findAllByType(status)) || [];

    return users;
  }
}
