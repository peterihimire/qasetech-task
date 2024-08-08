import {
  addTransaction,
  foundTransactionById,
  foundAllTransactions,
} from "../../services/transactionService";
import * as transactionRepository from "../../repositories/transactionRepository";
import BaseError from "../../utils/base-error";
import { httpStatusCodes } from "../../utils/http-status-codes";
import { ITransaction } from "../../models/Transaction";
import { SimpleTransaction } from "../../types/types";

// Mocked transactionRepository
jest.mock("../../repositories/transactionRepository");

interface filteredTransaction {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  transactions: SimpleTransaction[];
}

const mockedTransactionRepository = transactionRepository as jest.Mocked<
  typeof transactionRepository
>;

describe("Transaction Service Tests", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("addTransaction", () => {
    it("should add a transaction and return it", async () => {
      // Mocked transaction data
      const mockTransaction: SimpleTransaction = {
        id: "1234",
        amount: 100,
        type: "credit",
        description: "Payment",
        date: new Date(),
      };

      // Mocked implementation of createTransaction
      mockedTransactionRepository.createTransaction.mockResolvedValue(
        mockTransaction as unknown as ITransaction
      );

      // Called the addTransaction service method
      const result = await addTransaction({
        amount: 100,
        type: "credit",
        description: "Payment",
        date: new Date(),
      });

      // Assertions
      expect(result).toEqual(mockTransaction);

      // Use .toMatchObject for partial matching where `date` can be any instance of Date
      expect(
        mockedTransactionRepository.createTransaction
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 100,
          type: "credit",
          description: "Payment",
        })
      );
    });
  });

  describe("foundTransactionById", () => {
    it("should find a transaction by ID", async () => {
      const mockTransaction: SimpleTransaction = {
        id: "1234",
        amount: 100,
        type: "credit",
        description: "Payment",
        date: new Date(),
      };

      mockedTransactionRepository.findTransactionById.mockResolvedValue(
        mockTransaction as unknown as ITransaction
      );

      const result = await foundTransactionById({ id: "1234" });

      expect(result).toEqual(mockTransaction);
      expect(
        mockedTransactionRepository.findTransactionById
      ).toHaveBeenCalledWith("1234");
    });

    it("should throw an error if transaction does not exist", async () => {
      mockedTransactionRepository.findTransactionById.mockResolvedValue(null);

      await expect(foundTransactionById({ id: "1234" })).rejects.toThrow(
        new BaseError("Transaction does not exist!", httpStatusCodes.NOT_FOUND)
      );
    });
  });

describe("foundAllTransactions", () => {
  it("should find all transactions", async () => {
    // // Create a partial mock transaction
    // const mockTransaction: Partial<ITransaction> = {
    //   id: "1234",
    //   amount: 100,
    //   type: "credit",
    //   description: "Payment",
    //   date: new Date(),
    // };

    // // Correctly typed mockTransactions
    // const mockTransactions = {
    //   totalItems: 20,
    //   totalPages: 5,
    //   currentPage: 1,
    //   transactions: [mockTransaction as ITransaction], // Cast to ITransaction
    // };

    const mockTransaction: Partial<ITransaction> = {
      id: "1234",
      amount: 100,
      type: "credit",
      description: "Payment",
      date: new Date(),
    };

    const mockTransactions = {
      totalItems: 20,
      totalPages: Math.ceil(20 / 10), // Ensure this matches the result from your function
      currentPage: 1,
      transactions: [mockTransaction as ITransaction],
    };

    // Mock functions
    jest
      .spyOn(transactionRepository, "countTransactions")
      .mockResolvedValue(mockTransactions.totalItems);
    jest
      .spyOn(transactionRepository, "findAllTransactions")
      .mockResolvedValue(mockTransactions.transactions);

    // Call the service function
    const result = await foundAllTransactions(1, 10);

    // Verify the result
    expect(result).toEqual(mockTransactions);
    expect(transactionRepository.findAllTransactions).toHaveBeenCalledWith(
      10,
      0
    ); // Offset is (1-1) * 10 = 0
  });

  it("should return empty transactions if no transactions found", async () => {
    const mockTransactions = {
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      transactions: [], // Empty array when no transactions
    };

    jest
      .spyOn(transactionRepository, "countTransactions")
      .mockResolvedValue(mockTransactions.totalItems);
    jest
      .spyOn(transactionRepository, "findAllTransactions")
      .mockResolvedValue(mockTransactions.transactions);

    const result = await foundAllTransactions(1, 10);

    expect(result).toEqual(mockTransactions);
    expect(transactionRepository.findAllTransactions).toHaveBeenCalledWith(
      10,
      0
    ); // Offset is (1-1) * 10 = 0
  });

});

  // describe("foundAllTransactions", () => {
  //   it("should find all transactions", async () => {
  //     const mockTransactions: SimpleTransaction[] = [
  //       {
  //         id: "1234",
  //         amount: 100,
  //         type: "credit",
  //         description: "Payment",
  //         date: new Date(),
  //       },
  //     ];

  //     mockedTransactionRepository.findAllTransactions.mockResolvedValue(
  //       mockTransactions as unknown as ITransaction[]
  //     );

  //     const result = await foundAllTransactions();

  //     expect(result).toEqual(mockTransactions);
  //     expect(
  //       mockedTransactionRepository.findAllTransactions
  //     ).toHaveBeenCalled();
  //   });

  //   it("should throw an error if no transactions found", async () => {
  //     mockedTransactionRepository.findAllTransactions.mockResolvedValue([]);

  //     await expect(foundAllTransactions()).rejects.toThrow(
  //       new BaseError("No transactions found!", httpStatusCodes.NOT_FOUND)
  //     );
  //   });
  // });
});
