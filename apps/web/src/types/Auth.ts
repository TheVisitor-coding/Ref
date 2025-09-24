import { User } from "./User";

export type SignupRequestType = {
  username: string;
  email: string;
  password: string;
};

export type AuthResponseType = {
  user: User;
  jwt: string;
};