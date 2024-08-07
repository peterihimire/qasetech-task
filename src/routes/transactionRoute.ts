import { Router } from "express";
import {
  addNewTransaction,
  getTransactions,
  getTransaction,
} from "../controllers/transactionController";
import { TransactionValidator } from "../middlewares/validator";
import { verifyTokenAndAuthorization } from "../middlewares/verifyToken";

const router = Router();

router.post("", verifyTokenAndAuthorization,TransactionValidator, addNewTransaction);
router.get("", verifyTokenAndAuthorization, getTransactions);
router.get("/:id", verifyTokenAndAuthorization, getTransaction);

export default router;
