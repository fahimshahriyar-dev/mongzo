require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { catchAsyncError } from "../middleware/catchAsyncError";
import userModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import sendMail from "../utils/sendMail";

// Registration Request Interface
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
}

interface IActivationToken {
  token: string;
  activationCode: string;
}

// 1. REGISTRATION USER (Sends activation email with 4-digit code)
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

      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your Mongzo account",
          template: "activationMail.ejs",
          data,
        });

        res.status(200).json({
          success: true,
          message: `Please check your email (${user.email}) to activate your account!`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        console.error("Mail send error:", error);
        return next(new ErrorHandler(error.message || "Failed to send verification email.", 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Helper function to create activation token
export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    (process.env.ACTIVATION_SECRET || "mongzo_activation_secret_key_12345") as string,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

// 2. ACTIVATE USER
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } = req.body as IActivationRequest;

      if (!activation_token || !activation_code) {
        return next(new ErrorHandler("Please enter your activation code.", 400));
      }

      const newUser: { user: IRegistrationBody; activationCode: string } = jwt.verify(
        activation_token,
        (process.env.ACTIVATION_SECRET || "mongzo_activation_secret_key_12345") as string
      ) as { user: IRegistrationBody; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code.", 400));
      }

      const { name, email, password } = newUser.user;

      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return next(new ErrorHandler("Email already exists.", 400));
      }

      const user = await userModel.create({
        name,
        email,
        password,
        role: "user",
      });

      await sendToken(user, 201, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message || "Activation code has expired.", 400));
    }
  }
);

// 3. LOGIN USER
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

// 4. FORGOT PASSWORD (Sends verification code)
interface IForgotPasswordRequest {
  email: string;
}

export const forgotPassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body as IForgotPasswordRequest;

      if (!email) {
        return next(new ErrorHandler("Please enter your email address.", 400));
      }

      const user = await userModel.findOne({ email });
      if (!user) {
        return next(new ErrorHandler("No user found with this email address.", 404));
      }

      const resetToken = createActivationToken({ email: user.email, name: user.name });
      const resetCode = resetToken.activationCode;

      const data = { user: { name: user.name }, resetCode };

      try {
        await sendMail({
          email: user.email,
          subject: "Reset your Mongzo password",
          template: "resetPasswordMail.ejs",
          data,
        });

        res.status(200).json({
          success: true,
          message: `Password reset code sent to your email (${user.email}).`,
          resetToken: resetToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message || "Failed to send reset email.", 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// 5. RESET PASSWORD WITH VERIFICATION CODE
interface IResetPasswordRequest {
  reset_token: string;
  reset_code: string;
  new_password: string;
}

export const resetPassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reset_token, reset_code, new_password } = req.body as IResetPasswordRequest;

      if (!reset_token || !reset_code || !new_password) {
        return next(new ErrorHandler("Please provide reset code and your new password.", 400));
      }

      if (new_password.length < 8) {
        return next(new ErrorHandler("Password must be at least 8 characters long.", 400));
      }

      const decoded: { user: { email: string; name: string }; activationCode: string } = jwt.verify(
        reset_token,
        (process.env.ACTIVATION_SECRET || "mongzo_activation_secret_key_12345") as string
      ) as { user: { email: string; name: string }; activationCode: string };

      if (decoded.activationCode !== reset_code) {
        return next(new ErrorHandler("Invalid verification code.", 400));
      }

      const user = await userModel.findOne({ email: decoded.user.email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User not found.", 404));
      }

      user.password = new_password;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password reset successfully! Please login with your new password.",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message || "Verification code has expired.", 400));
    }
  }
);

// 6. LOGOUT USER
export const logoutUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// 7. UPDATE ACCESS TOKEN
export const updateAccessToken = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded = jwt.verify(
        refresh_token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      const message = "Could not refresh token.";
      if (!decoded) {
        return next(new ErrorHandler(message, 400));
      }

      const user = await userModel.findById(decoded.id);
      if (!user) {
        return next(
          new ErrorHandler("Please login to access this resource.", 400)
        );
      }

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "3d",
        }
      );

      req.user = user;

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      next();
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// 8. GET USER INFO
export const getUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id?.toString();

      if (!userId) {
        return next(new ErrorHandler("User ID is not available.", 400));
      }

      const user = await userModel.findById(userId);

      if (!user) {
        return next(
          new ErrorHandler("Please login to access this resource.", 400)
        );
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
