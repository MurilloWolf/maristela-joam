import { ICamping } from "@/core/models/camping.model";
import mockedWorkTeamInscriptions from "./inscriptions.workteam";
import mockedCamperInscriptions from "./inscriptions.camper";

const mockedCamping: ICamping[] = [
  {
    id: "1",
    number: 64,
    year: 2023,
    statusWorkTeam: "closed",
    statusCamper: "closed",
    inscriptionsWorkTeam: mockedWorkTeamInscriptions,
    inscriptionCamper: mockedCamperInscriptions,
    inscriptionCamperStartDate: new Date("04/01/2023"),
    inscriptionCamperEndDate: new Date("06/01/2023"),
    inscriptionWorkTeamStartDate: new Date("03/01/2023"),
    inscriptionWorkTeamEndDate: new Date("06/01/2023"),
    campingStartDate: new Date("07/04/2023"),
    campingEndDate: new Date("07/07/2023"),
    created_at: new Date("01/01/2023"),
    updated_at: new Date("02/01/2023"),
  },
  {
    id: "2",
    number: 65,
    year: 2024,
    statusWorkTeam: "open",
    statusCamper: "closed",
    inscriptionsWorkTeam: mockedWorkTeamInscriptions,
    inscriptionCamper: mockedCamperInscriptions,
    inscriptionCamperStartDate: new Date("04/01/2024"),
    inscriptionCamperEndDate: new Date("06/01/2024"),
    inscriptionWorkTeamStartDate: new Date("01/01/2024"),
    inscriptionWorkTeamEndDate: new Date("06/01/2024"),
    campingStartDate: new Date("07/04/2024"),
    campingEndDate: new Date("07/07/2024"),
    created_at: new Date("01/01/2024"),
    updated_at: null,
  },
];

export default mockedCamping;
