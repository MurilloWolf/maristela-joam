import { IUser } from "@/core/models/user.model";
import { IUserRepository } from "@/core/repository/user.repository";
import users from "@/core/db/user.table";

export default class InMemoryUserRepository implements IUserRepository {
  private users: IUser[];

  constructor(users: IUser[] = []) {
    this.users = users;
  }

  create(user: IUser): Promise<IUser> {
    return new Promise((resolve) => {
      this.users.push(user);
      resolve(user);
    });
  }
  update(user: IUser): Promise<IUser> {
    return new Promise((resolve) => {
      const index = this.users.findIndex((u) => u.id === user.id);
      this.users[index] = user;
      resolve(user);
    });
  }
  delete(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const index = this.users.findIndex((u) => u.id === id);
      this.users.splice(index, 1);
      resolve(true);
    });
  }
  findById(id: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((u) => u.id === id);

      if (!user) {
        return reject(new Error("User not found"));
      }

      return resolve(user);
    });
  }

  findByName(name: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((u) => u.name === name);

      if (!user) {
        return reject(new Error("User not found"));
      }

      return resolve(user);
    });
  }
  findByDocument(document: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((u) => u.document === document);

      if (!user) {
        return reject(new Error("User not found"));
      }

      return resolve(user);
    });
  }
  findAll(): Promise<IUser[]> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  async save(user: IUser): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<IUser | Error> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return new Error("Invalid email");
    }
    return user;
  }
}
