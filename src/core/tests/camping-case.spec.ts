import exp from "constants";
import InMemoryCampingRepository from "../infra/memory/camping";
import CampingCases from "../useCases/camping.cases";
import mockedCamping from "./mock/camping";
import { ICamping } from "../models/camping.model";
import errorDictinoray from "../errors/dictinoray";

function setup() {
  const camping = new CampingCases(new InMemoryCampingRepository());
  camping.createCamping(mockedCamping[0]);
  camping.createCamping(mockedCamping[1]);
  return { camping };
}

describe("Camping use case", () => {
  describe("Camping", () => {
    it("should be create a camping", async () => {
      const newCamping = new CampingCases(new InMemoryCampingRepository());
      const campingToCreate = {
        id: "3",
        number: 66,
        year: 2025,
        statusWorkTeam: "open",
        statusCamper: "closed",
        inscriptionsWorkTeam: [],
        inscriptionCamper: [],
        inscriptionCamperStartDate: new Date("04/01/2025"),
        inscriptionCamperEndDate: new Date("06/01/2025"),
        inscriptionWorkTeamStartDate: new Date("01/01/2025"),
        inscriptionWorkTeamEndDate: new Date("06/01/2025"),
        campingStartDate: new Date("07/04/2025"),
        campingEndDate: new Date("07/07/2025"),
      };

      const createdCamping = await newCamping.createCamping(campingToCreate);

      expect(createdCamping).toEqual(campingToCreate);
    });

    it("should delete a camping", async () => {
      const { camping } = setup();
      const res = await camping.deleteCamping("1");
      expect(res).toBe(true);
    });

    it("should be update a camping", async () => {
      const { camping } = setup();
      const campingToUpdate = {
        id: "1",
        number: 66,
        year: 2025,
        statusWorkTeam: "open",
        statusCamper: "closed",
        inscriptionsWorkTeam: [],
        inscriptionCamper: [],
        inscriptionCamperStartDate: new Date("04/01/2025"),
        inscriptionCamperEndDate: new Date("06/01/2025"),
        inscriptionWorkTeamStartDate: new Date("01/01/2025"),
        inscriptionWorkTeamEndDate: new Date("06/01/2025"),
        campingStartDate: new Date("07/04/2025"),
        campingEndDate: new Date("07/07/2025"),
      };

      const updatedCamping = await camping.updateCamping(campingToUpdate);

      expect(updatedCamping).toEqual(campingToUpdate);
    });

    it("should be return all campings", async () => {
      const { camping } = setup();
      const res = await camping.findAllCampings();
      expect(res.length).toBe(2);
    });

    it("should be return a camping searched by id", async () => {
      const { camping } = setup();
      const res = await camping.findCampingById("1");
      expect(res.id).toBe("1");
    });

    it("should be return error on not found camping", async () => {
      const { camping } = setup();
      await camping.deleteCamping("9").catch((err: Error) => {
        expect(err.message).toBe(
          errorDictinoray.campingErrors.notFound.message
        );
      });
    });
  });

  describe("Work Team", () => {
    it("should be open inscription for work team", async () => {
      const { camping } = setup();
      const res = (await camping.openInscriptionForWorkTeam("1")) as ICamping;
      expect(res.statusWorkTeam).toBe("open");
    });

    it("should be finish inscription for work team", async () => {
      const { camping } = setup();

      const res = (await camping.finishInscriptionForWorkTeam("2")) as ICamping;
      expect(res.statusWorkTeam).toBe("closed");
    });

    it("should be return error on trying to open inscription for work team", async () => {
      const { camping } = setup();

      await camping.openInscriptionForWorkTeam("1");
      const res = (await camping.openInscriptionForWorkTeam("1")) as Error;
      expect(res.message).toBe(
        errorDictinoray.campingErrors.inscriptionForWorkTeamIsAllReadyOpen
          .message
      );
    });

    it("should be return error on not found camping", async () => {
      const { camping } = setup();
      try {
        await camping.openInscriptionForCamper("9");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe(
          errorDictinoray.campingErrors.notFound.message
        );
      }
    });
  });

  describe("Camper", () => {
    it("should be open inscription for camper", async () => {
      const { camping } = setup();

      const res = (await camping.openInscriptionForCamper("2")) as ICamping;
      expect(res.statusCamper).toBe("open");
    });

    it("should be finish a inscription for camper", async () => {
      const { camping } = setup();

      await camping.openInscriptionForCamper("2");
      const res = (await camping.finishInscriptionForCamper("2")) as ICamping;
      expect(res.statusWorkTeam).toBe("closed");
    });

    it("should be finish return error on trying to open inscription for camper", async () => {
      const { camping } = setup();

      await camping.openInscriptionForCamper("1");
      const res = (await camping.openInscriptionForCamper("1")) as Error;
      expect(res.message).toBe(
        errorDictinoray.campingErrors.inscriptionForCamperIsAllReadyOpen.message
      );
    });

    it("should be finish return error on trying to finish inscription for camper", async () => {
      const { camping } = setup();

      await camping.finishInscriptionForCamper("1");
      const res = (await camping.finishInscriptionForCamper("1")) as Error;
      expect(res.message).toBe(
        errorDictinoray.campingErrors.campingNotOpen.message
      );
    });
    it("should be return error on not found camping", async () => {
      const { camping } = setup();

      try {
        await camping.openInscriptionForCamper("9");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe(
          errorDictinoray.campingErrors.notFound.message
        );
      }
    });
  });
});
