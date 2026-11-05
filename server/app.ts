require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import userRouter from "./routes/user.route";

// security headers
app.use(helmet());

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// parse allowed origins from environment variable or fallback to localhost
const allowedOrigins = process.env.ORIGIN
  ? process.env.ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:3000", "http://127.0.0.1:3000"];

// cors (cross origin resource sharing)
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(null, true); // fallback allow for smooth development/hosting
    },
    credentials: true,
  })
);

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // disable the `X-RateLimit-*` headers
});
app.use("/api/v1", limiter);

// routers
app.use("/api/v1", userRouter);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working.",
  });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found.`) as any;
  next(err);
});

app.use(ErrorMiddleware);
