export type AuthType = "developer" | "admin" | "user";
export type GenderType = "male" | "female";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  document: string;
  gender: GenderType;

  auth: AuthType;
  birthdate: Date;
  created_at: Date;
  updated_at: Date | null;
}
