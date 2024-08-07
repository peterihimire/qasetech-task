import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { IUser } from "../models/User";
import * as authRepository from "../repositories/authRepository"; // Import repository functions
import BaseError from "../utils/base-error";
import { httpStatusCodes } from "../utils/http-status-codes";

dotenv.config();

/**
 * Registers a new user.
 * @param data The data of the user to create.
 * @returns Promise<IUser | null>
 */
export const registerUser = async (data: {
  username: string;
  password: string;
}): Promise<IUser | null> => {
  const existingUser = await authRepository.findUserByUsername(data.username);
  if (existingUser) {
    throw new BaseError(
      "Account already exists, login instead!",
      httpStatusCodes.CONFLICT
    );
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const newUser = await authRepository.createUser({
    username: data.username,
    password: hashedPassword,
  });

  return newUser;
};

/**
 * Logs in a user and returns a JWT token.
 * @param username The username of the user to login.
 * @param password The password of the user to login.
 * @returns Promise<{ token: string; user: IUser }>
 */
export const loginUser = async (
  username: string,
  password: string
): Promise<{ token: string; user: IUser }> => {
  const foundUser = await authRepository.findUserByUsername(username);
  if (!foundUser) {
    throw new BaseError(
      "Error logging in, check credentials!",
      httpStatusCodes.CONFLICT
    );
  }

  const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordMatch) {
    throw new BaseError(
      "Wrong password or username!",
      httpStatusCodes.UNAUTHORIZED
    );
  }

  const JWT_KEY = process.env.JWT_KEY;
  if (!JWT_KEY) {
    throw new Error("JWT_KEY is not defined in the environment variables");
  }

  const token = sign(
    { id: foundUser.id, username: foundUser.username },
    JWT_KEY,
    {
      expiresIn: "1h",
    }
  );

  return { token, user: foundUser };
};

// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// import { sign } from "jsonwebtoken";
// import { IUser } from "../models/User"; // Adjust based on your User model
// import UserModel from "../models/User"; // Adjust based on your User model
// import BaseError from "../utils/base-error";
// import { httpStatusCodes } from "../utils/http-status-codes";

// dotenv.config();

// /**
//  * Finds a user by username.
//  * @param username The username of the user to find.
//  * @returns Promise<IUser | null>
//  */
// export const findUserByUsername = async (
//   username: string
// ): Promise<IUser | null> => {
//   return UserModel.findOne({ username }).exec();
// };

// /**
//  * Registers a new user.
//  * @param data The data of the user to create.
//  * @returns Promise<IUser | null>
//  */
// export const registerUser = async (data: {
//   username: string;
//   password: string;
// }): Promise<IUser | null> => {
//   const existingUser = await findUserByUsername(data.username);
//   if (existingUser) {
//     throw new BaseError(
//       "Account already exists, login instead!",
//       httpStatusCodes.CONFLICT
//     );
//   }

//   const salt = await bcrypt.genSalt();
//   const hashedPassword = await bcrypt.hash(data.password, salt);

//   const newUser = new UserModel({
//     username: data.username,
//     password: hashedPassword,
//   });

//   await newUser.save();
//   return newUser;
// };

// /**
//  * Logs in a user and returns a JWT token.
//  * @param username The username of the user to login.
//  * @param password The password of the user to login.
//  * @returns Promise<{ token: string; user: IUser }>
//  */
// export const loginUser = async (
//   username: string,
//   password: string
// ): Promise<{ token: string; user: IUser }> => {
//   const foundUser = await findUserByUsername(username);
//   if (!foundUser) {
//     throw new BaseError(
//       "Error logging in, check credentials!",
//       httpStatusCodes.CONFLICT
//     );
//   }

//   const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
//   if (!isPasswordMatch) {
//     throw new BaseError(
//       "Wrong password or username!",
//       httpStatusCodes.UNAUTHORIZED
//     );
//   }

//   const JWT_KEY = process.env.JWT_KEY;
//   if (!JWT_KEY) {
//     throw new Error("JWT_KEY is not defined in the environment variables");
//   }

//   const token = sign(
//     { id: foundUser.id, username: foundUser.username },
//     JWT_KEY,
//     {
//       expiresIn: "1h",
//     }
//   );

//   return { token, user: foundUser };
// };
