import errorDictinoray from "../errors/dictinoray";
import { ICamping } from "../models/camping.model";
import { ICampingRepository } from "../repository/camping.repository";

export default class CampingCases {
  private campingRepository: ICampingRepository;

  constructor(campingRepository: ICampingRepository) {
    this.campingRepository = campingRepository;
  }

  async createCamping(camping: ICamping): Promise<ICamping | Error> {
    const res = await this.campingRepository.create(camping);
    if (typeof res === "object" && res instanceof Error) {
      return errorDictinoray.campingErrors.cantCreate;
    }
    return res;
  }

  async openInscriptionForWorkTeam(
    campingId: string
  ): Promise<ICamping | Error> {
    const camping = await this.campingRepository.findById(campingId);
    if (!camping) {
      return errorDictinoray.campingErrors.notFound;
    }

    if (camping.statusWorkTeam !== "closed") {
      return errorDictinoray.campingErrors.inscriptionForWorkTeamIsAllReadyOpen;
    }
    return await this.openCampingInscription(campingId, "statusWorkTeam");
  }

  async openInscriptionForCamper(campingId: string): Promise<ICamping | Error> {
    const camping = await this.campingRepository.findById(campingId);
    if (!camping) {
      return errorDictinoray.campingErrors.notFound;
    }

    if (camping.statusCamper === "open") {
      return errorDictinoray.campingErrors.inscriptionForCamperIsAllReadyOpen;
    }
    return await this.openCampingInscription(campingId, "statusCamper");
  }

  async finishInscriptionForWorkTeam(
    campingId: string
  ): Promise<ICamping | Error> {
    const camping = await this.campingRepository.findById(campingId);
    if (!camping) {
      return errorDictinoray.campingErrors.notFound;
    }

    if (camping.statusWorkTeam !== "open") {
      return errorDictinoray.campingErrors.inscriptionForWorkTeamIsAllReadyOpen;
    }
    return this.finishCampingInscription(campingId, "statusWorkTeam");
  }

  async finishInscriptionForCamper(
    campingId: string
  ): Promise<ICamping | Error> {
    const camping = await this.campingRepository.findById(campingId);
    if (!camping) {
      return new Error("Camping not found");
    }

    if (camping.statusCamper === "close") {
      return errorDictinoray.campingErrors.inscriptionForCamperIsAllReadyClose;
    }
    return await this.finishCampingInscription(campingId, "statusCamper");
  }

  private async finishCampingInscription(
    campingId: string,
    type: "statusWorkTeam" | "statusCamper"
  ): Promise<ICamping | Error> {
    const camping = await this.campingRepository.findById(campingId);
    if (!camping) {
      return errorDictinoray.campingErrors.notFound;
    }

    if (camping[type] !== "open") {
      return errorDictinoray.campingErrors.campingNotOpen;
    }
    camping[type] = "closed";
    const res = await this.campingRepository.update(camping);
    return res;
  }

  private async openCampingInscription(
    campingId: string,
    type: "statusWorkTeam" | "statusCamper"
  ): Promise<ICamping | Error> {
    const camping = await this.campingRepository.findById(campingId);
    if (!camping) {
      return errorDictinoray.campingErrors.notFound;
    }

    if (camping[type] !== "closed") {
      return errorDictinoray.campingErrors.campingIsOpen;
    }

    camping[type] = "open";
    return await this.campingRepository.update(camping);
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

  async findAllCampings(): Promise<ICamping[]> {
    return await this.campingRepository.findAll();
  }
}
