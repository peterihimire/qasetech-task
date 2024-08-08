import UserModel from "../models/User";
import { IUser } from "../models/User";

/**
 * Finds a user by username.
 * @param username The username of the user to find.
 * @returns Promise<IUser | null>
 */
export const findUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  return UserModel.findOne({ username }).exec();
};

/**
 * Finds a user by id.
 * @param id The id of the user to find.
 * @returns Promise<IUser | null>
 */
export const findUserById = async (id: string): Promise<IUser | null> => {
  return UserModel.findOne({ _id: id }).exec();
};

/**
 * Creates a new user.
 * @param data The data of the user to create.
 * @returns Promise<IUser | null>
 */
export const createUser = async (data: {
  username: string;
  password: string;
}): Promise<IUser | null> => {
  const newUser = new UserModel({
    username: data.username,
    password: data.password, // Password should be hashed before saving
  });

  await newUser.save();
  return newUser;
};

