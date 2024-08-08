import TransactionModel from "../models/Transaction";
import { ITransaction } from "../models/Transaction";

/**
 * Creates a new transaction.
 * @param data The data of the transaction to create.
 * @returns Promise<ITransaction | null>
 */
export const createTransaction = async (data: {
  amount: number;
  type: string;
  description: string;
}): Promise<ITransaction | null> => {
  const newTransaction = new TransactionModel({
    amount: data.amount,
    type: data.type,
    description: data.description,
  });

  await newTransaction.save();
  return newTransaction;
};

/**
 * Finds a transaction by amount.
 * @param id The amount of the transaction to find.
 * @returns Promise<ITransaction | null>
 */
export const findTransactionById = async (
  id: string
): Promise<ITransaction | null> => {
  return TransactionModel.findOne({ id: id }).exec();
};

/**
 * Counts the total number of transactions.
 * @returns Promise<number>
 */
export const countTransactions = async (): Promise<number> => {
  return TransactionModel.countDocuments().exec();
};

/**
 * Finds all transactions with pagination.
 * @param limit Number of transactions to retrieve per page.
 * @param offset Number of transactions to skip.
 * @returns Promise<ITransaction[]>
 */
export const findAllTransactions = async (
  limit: number,
  offset: number
): Promise<ITransaction[]> => {
  return TransactionModel.find().skip(offset).limit(limit).exec();
};

// /**
//  * Finds all transactions.
//  * @returns Promise<ITransaction[] | null>
//  */
// export const findAllTransactions = async (): Promise<ITransaction[] | null> => {
//   return TransactionModel.find().exec();
// };
