import { IInscription } from "@/core/models/inscription.model";
import { mockedUsers } from "./users";
const mockedWorkTeamInscriptions: IInscription[] = [
  {
    id: "1",
    campingId: "1",
    user: mockedUsers[3],
    createdAt: new Date("03/02/2023"),
    updatedAt: null,
  },
  {
    id: "2",
    campingId: "1",
    user: mockedUsers[4],
    createdAt: new Date("03/04/2023"),
    updatedAt: new Date("03/09/2023"),
  },
  {
    id: "3",
    campingId: "1",
    user: mockedUsers[5],
    createdAt: new Date("03/05/2023"),
    updatedAt: null,
  },
];

export default mockedWorkTeamInscriptions;
