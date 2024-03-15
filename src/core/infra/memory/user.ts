import { IUser } from "@/core/models/user.model";
import { IUserRepository } from "@/core/repository/user.repository";
import { v4 } from "uuid";
import users from "@/core/db/user.table";
import errorDictinoray from "@/core/errors/dictinoray";

export default class InMemoryUserRepository implements IUserRepository {
  private users: IUser[];

  constructor(users: IUser[] = []) {
    this.users = users;
  }

  create(user: Partial<IUser>): Promise<IUser> {
    return new Promise((resolve) => {
      user.id = v4();
      user.created_at = new Date();
      user.updated_at = null;
      console.log(user);
      this.users.push(user as IUser);
      resolve(user as IUser);
    });
  }
  update(user: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index === -1) {
        reject(errorDictinoray.userErros.userNotFound);
      }
      this.users[index] = user;
      resolve(user);
    });
  }
  delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const index = this.users.findIndex((u) => u.id === id);
      if (index === -1) {
        reject(errorDictinoray.userErros.userNotFound);
      }
      this.users.splice(index, 1);
      resolve(true);
    });
  }
  findById(id: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((u) => u.id === id);

      if (!user) {
        return reject(errorDictinoray.userErros.userNotFound);
      }

      return resolve(user);
    });
  }

  findByName(name: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((u) => u.name === name);

      if (!user) {
        return reject(errorDictinoray.userErros.userNotFound);
      }

      return resolve(user);
    });
  }
  findByDocument(document: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((u) => u.document === document);

      if (!user) {
        return reject(errorDictinoray.userErros.noUserWithThisDocument);
      }

      return resolve(user);
    });
  }
  findAll(): Promise<IUser[]> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  findByEmail(email: string): Promise<IUser | Error> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user) => user.email === email);
      if (!user) {
        return reject(errorDictinoray.userErros.invalidEmail);
      }
      return resolve(user);
    });
  }
}
