require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { catchAsyncError } from "../middleware/catchAsyncError";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";

// register user
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
}

export const registrationUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body as IRegistrationBody;

      if (!name || !email || !password) {
        return next(
          new ErrorHandler("Please enter your name, email and password.", 400)
        );
      }

      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists.", 400));
      }

      const user = await userModel.create({ name, email, password });

      await sendToken(user, 201, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// login user
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(
          new ErrorHandler("Please enter your email and password.", 400)
        );
      }

      const user = await userModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Invalid email or password.", 400));
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password.", 400));
      }

      await sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// logout user
export const logoutUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      const userId = req.user?._id?.toString() || "";

      await redis.del(userId);

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update access token
export const updateAccessToken = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;

      const message = "Could not refresh token.";
      if (!decoded) {
        return next(new ErrorHandler(message, 400));
      }

      const session = await redis.get(decoded.id as string);
      if (!session) {
        return next(
          new ErrorHandler("Please login to access this resource.", 400)
        );
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "3d",
        }
      );

      req.user = user;

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      await redis.set(user._id, JSON.stringify(user), "EX", 604800); // expire in 7 days

      next();
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get user info
export const getUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id?.toString();

      if (!userId) {
        return next(new ErrorHandler("User ID is not available.", 400));
      }

      const session = await redis.get(userId);

      if (!session) {
        return next(
          new ErrorHandler("Please login to access this resource.", 400)
        );
      }

      res.status(200).json({
        success: true,
        user: JSON.parse(session),
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
