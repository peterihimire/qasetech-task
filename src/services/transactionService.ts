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
 * Retrieves all transactions with pagination.
 * @param limit Number of transactions to retrieve per page.
 * @param offset Number of transactions to skip.
 * @param pageNum Current page number.
 * @param pageSize Number of transactions per page.
 * @returns Promise<{ totalItems: number, totalPages: number, currentPage: number, transactions: ITransaction[] }>
 */
export const foundAllTransactions = async (
  pageNum: number,
  pageSize: number
): Promise<{
  totalItems: number;
  totalPages: number;
  currentPage: number;
  transactions: ITransaction[];
}> => {
  const pageNumber = isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;
  const limit = isNaN(pageSize) || pageSize <= 0 ? 10 : pageSize;

  // Calculate pagination details
  const offset = (pageNumber - 1) * limit;

  try {
    // Get the total count of transactions
    const totalItems = await transactionRepository.countTransactions();

    // Get the paginated transactions
    const transactions = await transactionRepository.findAllTransactions(
      limit,
      offset
    );

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    // Return pagination details
    return {
      totalItems,
      totalPages,
      currentPage: pageNumber,
      transactions,
    };
  } catch (error) {
    throw new BaseError(
      "Failed to retrieve transactions",
      httpStatusCodes.INTERNAL_SERVER
    );
  }
};
