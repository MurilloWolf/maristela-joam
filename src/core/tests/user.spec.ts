import UserCases from "../useCases/user.cases";
import InMemoryUserRepository from "../infra/memory/user";
import { mockedUsers } from "./mock/users";
import errorDictinoray from "../errors/dictinoray";

describe("User use case", () => {
  const user = new UserCases(new InMemoryUserRepository());
  mockedUsers.forEach((userData) => user.createAccount(userData));

  it("should create a new user", async () => {
    const res = await user.createAccount(mockedUsers[0]);

    expect(res).toEqual(mockedUsers[0]);
  });

  it("Auth - should return auth user", async () => {
    const userData = mockedUsers[3];
    const { email, password } = userData;

    const res = await user.authenticate(email, password);

    expect(res).toEqual(userData);
  });

  it("Auth - should return error on ivalid email", async () => {
    const userData = mockedUsers[3];
    const email = "invalidEmail";
    const password = "invalidPassword";

    const res = await user.authenticate(email, password);

    expect(res).toEqual(errorDictinoray.userErros.invalidEmail);
  });

  it("Auth - should return error on ivalid password", async () => {
    const userData = mockedUsers[3];
    const { email } = userData;
    const password = "invalidPassword";

    const res = await user.authenticate(email, password);

    expect(res).toEqual(errorDictinoray.userErros.invalidPassword);
  });

  it("Auth Type - should return user auth type", async () => {
    const userData = mockedUsers[3];
    const { email } = userData;

    const res = await user.getUserAuthType(email);

    expect(res).toEqual(userData.auth);
  });
  it("Auth Type - should return invalid email", async () => {
    const email = "invalidEmail";

    const res = await user.getUserAuthType(email);

    expect(res).toEqual(errorDictinoray.userErros.invalidEmail);
  });
});
