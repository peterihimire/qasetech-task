import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { ITransaction } from "../models/Transaction";
import * as transactionRepository from "../repositories/transactionRepository";
import BaseError from "../utils/base-error";
import { httpStatusCodes } from "../utils/http-status-codes";

dotenv.config();

/**
 * Registers a new user.
 * @param data The data of the user to create.
 * @returns Promise<IUser | null>
 */
export const addTransaction = async (data: {
  amount: number;
  type: string;
  description: string;
  date: Date;
}): Promise<ITransaction | null> => {
  const newTransaction = await transactionRepository.createTransaction({
    amount: data.amount,
    type: data.type,
    description: data.description,
  
  });

  return newTransaction;
};

/**
 * Retrieves a transaction by its ID.
 * @param data The data containing the ID of the transaction to retrieve.
 * @returns Promise<ITransaction | null>
 */
export const foundTransactionById = async (data: {
  id: string;
}): Promise<ITransaction | null> => {
  const existingTransaction = await transactionRepository.findTransactionById(
    data.id
  );
  if (!existingTransaction) {
    throw new BaseError(
      "Transaction does not exist!",
      httpStatusCodes.NOT_FOUND
    );
  }

  return existingTransaction;
};

/**
 * Registers a new user.
 * @param data The data of the user to create.
 * @returns Promise<IUser | null>
 */
export const foundAllTransactions = async (): Promise<
  ITransaction[] | null
> => {
  const existingTransactions =
    await transactionRepository.findAllTransactions();
  if (!existingTransactions) {
    throw new BaseError("No transactions found!", httpStatusCodes.NOT_FOUND);
  }

  return existingTransactions;
};
