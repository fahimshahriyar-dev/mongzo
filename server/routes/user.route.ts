import express, { Request, Response } from "express";
import {
  activateUser,
  forgotPassword,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  resetPassword,
  updateAccessToken,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

// post
userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.post("/forgot-password", forgotPassword);

userRouter.post("/reset-password", resetPassword);

// get
userRouter.get("/logout", updateAccessToken, isAuthenticated, logoutUser);

userRouter.get(
  "/refreshToken",
  updateAccessToken,
  (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Tokens refreshed successfully.",
    });
  }
);

userRouter.get("/me", updateAccessToken, isAuthenticated, getUserInfo);

export default userRouter;
