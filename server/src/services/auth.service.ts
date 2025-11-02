import UserModel from "../models/user.model";
import { NotFoundException, UnauthorizedException } from "../utils/appError";
import {
  LoginSchemaType,
  RegisterSchemaType,
} from "../validators/auth.validator";

export const registerService = async (body: RegisterSchemaType) => {
  const { email } = body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) throw new UnauthorizedException("user already exist");
  const newUser = new UserModel({
    ...body,
  });
  await newUser.save();
  return newUser;
};

export const loginService = async (body: LoginSchemaType) => {
  const { email, password } = body;

  const user = await UserModel.findOne({ email });
  if (!user) throw new NotFoundException("User or Password not found");

  const passwordValid = await user.comparePassword(password);
  if (!passwordValid)
    throw new UnauthorizedException(" Invalid email or password");

  return user;
};
