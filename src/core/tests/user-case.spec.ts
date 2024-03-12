import UserCases from "../useCases/user.cases";
import InMemoryUserRepository from "../infra/memory/user";
import { mockedUsers } from "./mock/users";
import errorDictinoray from "../errors/dictinoray";

function setup() {
  const user = new UserCases(new InMemoryUserRepository());
  mockedUsers.forEach((userData) => user.createAccount(userData));
  return { user };
}

describe("User use case", () => {
  it("should create a new user", async () => {
    const { user } = setup();
    const res = await user.createAccount(mockedUsers[0]);

    expect(res).toEqual(mockedUsers[0]);
  });

  describe("Auth", () => {
    it("should return auth user", async () => {
      const { user } = setup();

      const userData = mockedUsers[3];
      const { email, password } = userData;

      const res = await user.authenticate(email, password);

      expect(res).toEqual(userData);
    });

    it("should return error on ivalid email", async () => {
      const { user } = setup();

      const userData = mockedUsers[3];
      const email = "invalidEmail";
      const password = "invalidPassword";

      const res = await user.authenticate(email, password);

      expect(res).toEqual(errorDictinoray.userErros.invalidEmail);
    });

    it("should return error on ivalid password", async () => {
      const { user } = setup();

      const userData = mockedUsers[3];
      const { email } = userData;
      const password = "invalidPassword";

      const res = await user.authenticate(email, password);

      expect(res).toEqual(errorDictinoray.userErros.invalidPassword);
    });
  });

  describe("Auth type", () => {
    it("Auth Type - should return user auth type", async () => {
      const { user } = setup();

      const userData = mockedUsers[3];
      const { email } = userData;

      const res = await user.getUserAuthType(email);

      expect(res).toEqual(userData.auth);
    });
    it("Auth Type - should return invalid email", async () => {
      const { user } = setup();

      const email = "invalidEmail";

      const res = await user.getUserAuthType(email);

      expect(res).toEqual(errorDictinoray.userErros.invalidEmail);
    });
  });
});
