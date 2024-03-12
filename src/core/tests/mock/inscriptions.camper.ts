import { IInscription } from "@/core/models/inscription.model";
import { mockedUsers } from "./users";

const mockedCamperInscriptions: IInscription[] = [
  {
    id: "1",
    campingId: "1",
    user: mockedUsers[0],
    createdAt: new Date("04/02/2023"),
    updatedAt: null,
  },
  {
    id: "2",
    campingId: "1",
    user: mockedUsers[1],
    createdAt: new Date("04/03/2023"),
    updatedAt: null,
  },
  {
    id: "3",
    campingId: "1",
    user: mockedUsers[2],
    createdAt: new Date("04/04/2023"),
    updatedAt: new Date("04/06/2023"),
  },
];

export default mockedCamperInscriptions;
