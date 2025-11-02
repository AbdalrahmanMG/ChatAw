import { IUser } from "../types";

declare global {
  namespace Express {
    interface User extends IUser {
      _id?: any;
    }
  }
}