import { AuthType, IUser } from "../models/user.model";
import { IUserRepository } from "../repository/user.repository";

export default class UserCases {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async authenticate(email: string, password: string): Promise<IUser | Error> {
    const user = await this.userRepository.findByEmail(email);

    if (typeof user === "object" && user instanceof Error) {
      return new Error("Invalid email");
    }

    if (user.password !== password) {
      return new Error("Invalid password");
    }
    return user;
  }

  // this is not a user case beacuse the user is not explicit doing this action
  async getUserAuthType(email: string): Promise<AuthType | Error> {
    const user = await this.userRepository.findByEmail(email);
    if (typeof user === "object" && user instanceof Error) {
      return new Error("Invalid email");
    }
    return user.auth;
  }

  async createAccount(user: IUser): Promise<IUser> {
    return await this.userRepository.create(user);
  }
}
