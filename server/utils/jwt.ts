require("dotenv").config();
import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

// options for cookies
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + 5 * 60 * 1000),
  maxAge: 5 * 60 * 1000,
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production" ? true : false,
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  maxAge: 3 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production" ? true : false,
};

export const sendToken = async (
  user: IUser,
  statusCode: number,
  res: Response
) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  const userData = user.toObject();

  // upload session to redis
  await redis.set(user._id.toString(), JSON.stringify(userData), "EX", 604800); // expire in 7 days

  // parse environment variables to integrate with fallback values
  const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "5", 10);
  const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "3", 10);

  // cookie options
  const tokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production" ? true : false,
  };

  const refreshOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production" ? true : false,
  };

  res.cookie("access_token", accessToken, tokenOptions);
  res.cookie("refresh_token", refreshToken, refreshOptions);

  res.status(statusCode).json({
    success: true,
    user: userData,
    accessToken,
  });
};
