import express, { Application, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute";
import transactionRoute from "./routes/transactionRoute";
import {
  logErrorMiddleware,
  returnError,
  unknownRoute,
} from "./middlewares/errorHandler";

const corsOptions = {
  origin: ["http://localhost:3000", "https://localhost:3000"],
  methods: ["GET", "PUT", "PATCH", "POST", "OPTIONS", "DELETE", "HEAD"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
    "Origin",
    "Accept",
  ],
  credentials: true,
  optionSuccessStatus: 200,
  preflightContinue: false,
};

const app: Application = express();
app.set("trust proxy", 1);

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/qasetech/v1/auth", authRoute);
app.use("/api/qasetech/v1/transactions", transactionRoute);

app.use(unknownRoute);
app.use(logErrorMiddleware);
app.use(returnError);
export default app;
