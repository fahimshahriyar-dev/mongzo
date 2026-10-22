import express, { Request, Response } from "express";
import {
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  updateAccessToken,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

// post
userRouter.post("/registration", registrationUser);

userRouter.post("/login", loginUser);

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
