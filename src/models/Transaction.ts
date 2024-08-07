import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

// Define the interface for a Transaction document
export interface ITransaction extends Document {
  amount: number;
  type: string;
  description: string;
  date: Date;
}

// Define the schema for a Transaction
const TransactionSchema: Schema = new Schema({
  id: {
    type: String,
    default: uuidv4, // Use UUIDv4 as the default value
    unique: true, // Ensure the ID is unique
  },
  amount: { type: Number, required: true, default: 0 },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  description: { type: String, required: true },
  date: { type: Date, default: () => new Date() },
});

// Create and export the Transaction model
const TransactionModel = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
export default TransactionModel;
