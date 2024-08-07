import express from "express";
import { User, Transaction, JwtPayload } from "../types";
import { IUser } from "../../models/User";
import { ITransaction } from "../../models/Transaction";

// This works with the verify-token file
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      transaction?: ITransaction;
      jwt: JwtPayload;
    }
  }
}
