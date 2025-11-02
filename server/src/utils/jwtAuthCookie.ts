import { Env } from "../config/env.config";
import jwt from "jsonwebtoken";
import { Response } from "express";

type Cookie = {
  res: Response;
  userId: string;
};
type Time = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;

export const setJwtAuthCookie = ({ res, userId }: Cookie) => {
  const payload = { userId };
  const expiresIn = Env.JWT_EXPIRES_IN as Time;
  const token = jwt.sign(payload, Env.JWT_SECRET, {
    audience: ["user"],
    expiresIn: expiresIn || "7d",
  });

  return res.cookie("accessToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: Env.NODE_ENV === "production" ? true : false,
    sameSite: Env.NODE_ENV === "production" ? "strict" : "lax",
  });
};

export const clearjwtAuthCookie = (res: Response) =>
  res.clearCookie("accessToken", { path: "/" });
