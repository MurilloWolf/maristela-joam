import InMemoryCampingRepository from "../../../infra/memory/camping";
import { ICamping } from "../../../models/camping.model";
import errorDictionary from "../../../errors/dictinoray";

describe("InMemoryCampingRepository", () => {
  let campingRepository: InMemoryCampingRepository;
  let campings: ICamping[];

  beforeEach(() => {
    campings = [
      {
        id: "1",
        number: 1,
        year: 2023,
        statusWorkTeam: "open",
        statusCamper: "closed",
        inscriptionsWorkTeam: [],
        inscriptionCamper: [],
        inscriptionCamperStartDate: new Date(),
        inscriptionCamperEndDate: new Date(),
        inscriptionWorkTeamStartDate: new Date(),
        inscriptionWorkTeamEndDate: new Date(),
        campingStartDate: new Date(),
        campingEndDate: new Date(),
      },
      {
        id: "2",
        number: 2,
        year: 2024,
        statusWorkTeam: "closed",
        statusCamper: "open",
        inscriptionsWorkTeam: [],
        inscriptionCamper: [],
        inscriptionCamperStartDate: new Date(),
        inscriptionCamperEndDate: new Date(),
        inscriptionWorkTeamStartDate: new Date(),
        inscriptionWorkTeamEndDate: new Date(),
        campingStartDate: new Date(),
        campingEndDate: new Date(),
      },
    ];
    campingRepository = new InMemoryCampingRepository(campings);
  });

  describe("create", () => {
    it("should create a new camping", async () => {
      const newCamping: ICamping = {
        id: "3",
        number: 3,
        year: 2025,
        statusWorkTeam: "open",
        statusCamper: "open",
        inscriptionsWorkTeam: [],
        inscriptionCamper: [],
        inscriptionCamperStartDate: new Date(),
        inscriptionCamperEndDate: new Date(),
        inscriptionWorkTeamStartDate: new Date(),
        inscriptionWorkTeamEndDate: new Date(),
        campingStartDate: new Date(),
        campingEndDate: new Date(),
      };

      const createdCamping = await campingRepository.create(newCamping);

      expect(createdCamping).toEqual(newCamping);
      expect(campingRepository["campings"]).toContain(newCamping);
    });
  });

  describe("update", () => {
    it("should update an existing camping", async () => {
      const updatedCamping: ICamping = {
        id: "1",
        number: 1,
        year: 2023,
        statusWorkTeam: "closed",
        statusCamper: "open",
        inscriptionsWorkTeam: [],
        inscriptionCamper: [],
        inscriptionCamperStartDate: new Date(),
        inscriptionCamperEndDate: new Date(),
        inscriptionWorkTeamStartDate: new Date(),
        inscriptionWorkTeamEndDate: new Date(),
        campingStartDate: new Date(),
        campingEndDate: new Date(),
      };

      const result = await campingRepository.update(updatedCamping);

      expect(result).toEqual(updatedCamping);
      expect(campingRepository["campings"]).toContain(updatedCamping);
    });
  });

  describe("delete", () => {
    it("should delete an existing camping", async () => {
      const result = await campingRepository.delete("2");

      expect(result).toBe(true);
      expect(campingRepository["campings"].length).toBe(1);
    });
  });

  describe("findById", () => {
    it("should find camping by id", async () => {
      const foundCamping = await campingRepository.findById("1");

      expect(foundCamping).toEqual(campings[0]);
    });

    it("should return error if camping is not found", async () => {
      try {
        await campingRepository.findById("invalidId");
        // Fail the test if findById does not throw an error
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toEqual(errorDictionary.campingErrors.notFound);
      }
    });
  });

  describe("findAll", () => {
    it("should return all campings", async () => {
      const allCampings = await campingRepository.findAll();

      expect(allCampings).toEqual(campings);
    });
  });
});
