import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import BaseError from "../utils/base-error";
import { httpStatusCodes } from "../utils/http-status-codes";
import {
  addTransaction,
  foundAllTransactions,
  foundTransactionById,
} from "../services/transactionService";

/**
 * Registers a new user.
 */
export const addNewTransaction: RequestHandler = async (req, res, next) => {
  const { amount, type, date, description } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const createdTransaction = await addTransaction({
      amount,
      type,
      date,
      description,
    });

    if (!createdTransaction) {
      throw new BaseError(
        "Failed to create user",
        httpStatusCodes.INTERNAL_SERVER
      );
    }

    console.log("This is created transaction", createdTransaction);
    const transactionObject = createdTransaction.toObject();
    const { _id, ...transactionData } = transactionObject;

    res.status(httpStatusCodes.CREATED).json({
      status: "success",
      msg: "Transactionn added!",
      data: { transactionData },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

/**
 * Registers a new user.
 */
export const getTransactions: RequestHandler = async (req, res, next) => {
  try {
    const getAllTransactions = await foundAllTransactions();

    if (!getAllTransactions) {
      throw new BaseError("No transactions found", httpStatusCodes.NOT_FOUND);
    }

    console.log("This are all the available transactions", getAllTransactions);
    const transactionsArr = getAllTransactions.map((transaction) => {
      return {
        id: transaction.id,
        amount: transaction.amount,
        type: transaction.type,
        description: transaction.description,
        date: transaction.date,
        __v: transaction.__v,
      };
    });

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "All transactions",
      data: transactionsArr,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

/**
 * Registers a new user.
 */
export const getTransaction: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getTransactionById = await foundTransactionById({ id });

    if (!getTransactionById) {
      throw new BaseError("No transactions found", httpStatusCodes.NOT_FOUND);
    }

    console.log("This are all the available transactions", getTransactionById);
    const transactionObject = getTransactionById.toObject();
    const { _id, ...transactionData } = transactionObject;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Transaction info",
      data: { transactionData },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
