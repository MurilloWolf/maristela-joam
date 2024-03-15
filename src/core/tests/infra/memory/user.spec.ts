import errorDictinoray from "@/core/errors/dictinoray";
import InMemoryUserRepository from "@/core/infra/memory/user";
import { IUser } from "@/core/models/user.model";
import { mockedUsers as mock } from "@/core/tests/mock/users";

function setup(userList: IUser[] = []) {
  const userRepository = new InMemoryUserRepository(userList);
  return { userRepository };
}

describe("User Respository in Memory", () => {
  let mockedUsers: IUser[] = [];
  beforeEach(() => {
    mockedUsers = [...mock];
  });

  describe("Create", () => {
    it("should create a user", async () => {
      const { userRepository } = setup();
      const newUser = {
        name: "test",
        birthdate: new Date("1990-01-01"),
        gender: "male",
        document: "12345678901",
        email: "test@example.com",
        password: "12345678",
        auth: "user",
      };
      const user = await userRepository.create(newUser);
      expect(user).toEqual(user);
    });
  });

  describe("Update", () => {
    it("should update a user", async () => {
      const { userRepository } = setup(mockedUsers);
      let userToUpdate = mockedUsers[2];

      userToUpdate.name = "updated name";
      userToUpdate.document = "XXXXXXXXXX";

      const user = await userRepository.update(userToUpdate);
      expect(user).toEqual(userToUpdate);
    });

    it("should not update a user that does not exist", async () => {
      const { userRepository } = setup(mockedUsers);
      const userToUpdate = {
        ...mockedUsers[2],
        id: "nothing",
      };

      try {
        await userRepository.update(userToUpdate);
      } catch (error) {
        expect((error as Error).message).toBe(
          errorDictinoray.userErros.userNotFound.message
        );
      }
    });
  });

  describe("Delete", () => {
    it("should delete a user", async () => {
      const { userRepository } = setup(mockedUsers);
      const res = await userRepository.delete(mockedUsers[0].id);
      expect(res).toBe(true);
    });

    it("should not delete a user that does not exist", async () => {
      const { userRepository } = setup(mockedUsers);
      try {
        await userRepository.delete("nothing");
      } catch (error) {
        expect((error as Error).message).toBe(
          errorDictinoray.userErros.userNotFound.message
        );
      }
    });
  });

  describe("Search", () => {
    it("should find a user by id", async () => {
      const { userRepository } = setup(mockedUsers);
      const user = await userRepository.findById(mockedUsers[2].id);
      expect(user).toEqual(mockedUsers[2]);
    });

    it("should find a user by name", async () => {
      const { userRepository } = setup(mockedUsers);
      const user = await userRepository.findByName(mockedUsers[2].name);
      expect(user).toEqual(mockedUsers[2]);
    });

    it("should find a user by document", async () => {
      const { userRepository } = setup(mockedUsers);
      const user = await userRepository.findByDocument(mockedUsers[2].document);
      expect(user).toEqual(mockedUsers[2]);
    });

    it("should find a user by email", async () => {
      const { userRepository } = setup(mockedUsers);
      const user = await userRepository.findByEmail(mockedUsers[2].email);
      expect(user).toEqual(mockedUsers[2]);
    });

    it("should return all users", async () => {
      const { userRepository } = setup(mockedUsers);
      const users = await userRepository.findAll();
      expect(users).toEqual(mockedUsers);
    });

    it("should not find a user by id", async () => {
      const { userRepository } = setup(mockedUsers);
      try {
        await userRepository.findById("nothing");
      } catch (error) {
        expect((error as Error).message).toBe(
          errorDictinoray.userErros.userNotFound.message
        );
      }
    });

    it("should not find a user by name", async () => {
      const { userRepository } = setup(mockedUsers);
      try {
        await userRepository.findByName("nothing");
      } catch (error) {
        expect((error as Error).message).toBe(
          errorDictinoray.userErros.userNotFound.message
        );
      }
    });

    it("should not find a user by document", async () => {
      const { userRepository } = setup(mockedUsers);
      try {
        await userRepository.findByDocument("nothing");
      } catch (error) {
        expect((error as Error).message).toBe(
          errorDictinoray.userErros.noUserWithThisDocument.message
        );
      }
    });

    it("should not find a user by email", async () => {
      const { userRepository } = setup(mockedUsers);
      try {
        await userRepository.findByEmail("nothing");
      } catch (error) {
        expect((error as Error).message).toBe(
          errorDictinoray.userErros.invalidEmail.message
        );
      }
    });
  });
});
