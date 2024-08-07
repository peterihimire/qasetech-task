import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import BaseError from "../utils/base-error";
import { httpStatusCodes } from "../utils/http-status-codes";
import { registerUser, loginUser } from "../services/authService";

/**
 * Registers a new user.
 */
export const register: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const createdUser = await registerUser({ username, password });

    if (!createdUser) {
      throw new BaseError(
        "Failed to create user",
        httpStatusCodes.INTERNAL_SERVER
      );
    }

    console.log("This is created user", createdUser);
    const userObject = createdUser.toObject();
    const { password: _, ...userData } = userObject;

    res.status(httpStatusCodes.CREATED).json({
      status: "success",
      msg: "Signup successful!",
      data: { ...userData },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

/**
 * Logs in a user.
 */
export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const { token, user } = await loginUser(username, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    const userObject = user.toObject();
    const { password: _, ...userData } = userObject;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Signin successful",
      data: { ...userData },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

/**
 * Logs out a user.
 */
export const logout: RequestHandler = (req, res) => {
  res
    .clearCookie("token", {
      secure: false,
      sameSite: "lax",
    })
    .status(httpStatusCodes.OK)
    .json({
      status: "success",
      msg: "Signout successful.",
    });
};

// import { RequestHandler } from "express";
// import { validationResult } from "express-validator";
// import bcrypt from "bcrypt";
// import BaseError from "../utils/base-error";
// import { httpStatusCodes } from "../utils/http-status-codes";
// import {
//   // findUserByUsername,
//   // foundUserByUsername,
//   registerUser,
//   loginUser,
// } from "../services/authService";

// /**
//  * Registers a new user.
//  */
// export const register: RequestHandler = async (req, res, next) => {
//   const { username, password } = req.body;

//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const foundUser = await findUserByUsername(username);
//     if (foundUser) {
//       return next(
//         new BaseError(
//           "Account already exists, login instead!",
//           httpStatusCodes.CONFLICT
//         )
//       );
//     }

//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const createdUser = await registerUser({
//       username,
//       password: hashedPassword,
//     });
//     if (!createdUser) {
//       throw new BaseError(
//         "Failed to create user",
//         httpStatusCodes.INTERNAL_SERVER
//       );
//     }

//     const { id, password: _, ...others } = createdUser;
//     res.status(httpStatusCodes.OK).json({
//       status: "success",
//       msg: "Signup successful!",
//       data: { ...others },
//     });
//   } catch (error: any) {
//     if (!error.statusCode) {
//       error.statusCode = httpStatusCodes.INTERNAL_SERVER;
//     }
//     next(error);
//   }
// };

// /**
//  * Logs in a user.
//  */
// export const login: RequestHandler = async (req, res, next) => {
//   const { username, password } = req.body;

//   try {
//     const { token, user } = await loginUser(username, password);

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax", // because I'm working on localhost
//       maxAge: 3600000,
//     });

//     const { id, password: _, ...others } = user;
//     res.status(httpStatusCodes.OK).json({
//       status: "success",
//       msg: "Signin successful",
//       data: { ...others },
//     });
//   } catch (error: any) {
//     if (!error.statusCode) {
//       error.statusCode = httpStatusCodes.INTERNAL_SERVER;
//     }
//     next(error);
//   }
// };

// /**
//  * Logs out a user.
//  */
// export const logout: RequestHandler = async (req, res, next) => {
//   res
//     .clearCookie("token", {
//       secure: false,
//       sameSite: "lax",
//     })
//     .status(200)
//     .json({
//       status: "success",
//       msg: "Signout successful.",
//     });
// };
