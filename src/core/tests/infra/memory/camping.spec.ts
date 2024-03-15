import InMemoryCampingRepository from "../../../infra/memory/camping";
import { ICamping } from "../../../models/camping.model";
import errorDictionary from "../../../errors/dictinoray";
import mock from "../../mock/camping";

function setup(campinsg: ICamping[] = []) {
  return new InMemoryCampingRepository(campinsg);
}

describe("Camping Repository in Memory", () => {
  let mockedCamping: ICamping[] = [];

  beforeEach(() => {
    mockedCamping = [...mock];
  });

  describe("Create", () => {
    it("should create a camping", async () => {
      const campingRepository = setup();

      const camping = {
        number: 64,
        year: 2023,
        statusWorkTeam: "closed",
        statusCamper: "closed",
        inscriptionsWorkTeam: [],
        inscriptionCamper: [],
        inscriptionCamperStartDate: new Date("04/01/2023"),
        inscriptionCamperEndDate: new Date("06/01/2023"),
        inscriptionWorkTeamStartDate: new Date("03/01/2023"),
        inscriptionWorkTeamEndDate: new Date("06/01/2023"),
        campingStartDate: new Date("07/04/2023"),
        campingEndDate: new Date("07/07/2023"),
      };
      const createdCamping = await campingRepository.create(camping);
      expect(createdCamping).toEqual(camping);
    });
  });

  describe("Update", () => {
    it("should update a camping", async () => {
      const campingRepository = setup(mockedCamping);
      let campingToUpdate = mockedCamping[1];

      campingToUpdate.number = 66;
      campingToUpdate.year = 2025;
      campingToUpdate.statusWorkTeam = "closed";
      campingToUpdate.statusCamper = "closed";

      const result = await campingRepository.update(campingToUpdate);
      expect(result).toEqual(campingToUpdate);
    });

    it("should not update a camping that does not exist", async () => {
      const campingRepository = setup(mockedCamping);
      const campingToUpdate = {
        ...mockedCamping[1],
        id: "nothing",
      };

      try {
        await campingRepository.update(campingToUpdate);
      } catch (error) {
        expect((error as Error).message).toBe(
          errorDictionary.campingErrors.notFound.message
        );
      }
    });
  });

  describe("Delete", () => {
    it("should delete a camping", async () => {
      const campingRepository = setup(mockedCamping);
      const res = await campingRepository.delete(mockedCamping[0].id);
      expect(res).toBe(true);
    });

    it("should not delete a camping that does not exist", async () => {
      const campingRepository = setup(mockedCamping);
      try {
        await campingRepository.delete("nothing");
      } catch (error) {
        expect((error as Error).message).toBe(
          errorDictionary.campingErrors.notFound.message
        );
      }
    });
  });

  describe("Search", () => {
    it("should find a camping by id", async () => {
      const campingRepository = setup(mockedCamping);
      console.log(mockedCamping);
      const camping = await campingRepository.findById(mockedCamping[0].id);
      expect(camping).toEqual(mockedCamping[0]);
    });

    it("should find all campings", async () => {
      const campingRepository = setup(mockedCamping);
      const campings = await campingRepository.findAll();
      expect(campings).toEqual(mockedCamping);
    });

    it("should not find a camping by id", async () => {
      const campingRepository = setup(mockedCamping);
      try {
        await campingRepository.findById("nothing");
      } catch (error) {
        expect((error as Error).message).toBe(
          errorDictionary.campingErrors.notFound.message
        );
      }
    });
  });
});
