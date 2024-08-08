import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import BaseError from "../utils/base-error";
import { httpStatusCodes } from "../utils/http-status-codes";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
} from "../services/authService";

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
    const { accessToken, refreshToken, user } = await loginUser(
      username,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 604800000, // 7 days
    });

    const userObject = user.toObject();
    const { password: _, __v, ...userData } = userObject;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Signin successful",
      data: { ...userData, accessToken },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

/**
 * Refreshes the access token.
 */
export const refresh: RequestHandler = async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    const { accessToken, newRefreshToken } = await refreshAccessToken(
      refreshToken
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Token refreshed successfully",
      data: { accessToken, refreshToken: newRefreshToken },
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
    .clearCookie("refreshToken", {
      secure: false,
      sameSite: "lax",
    })
    .status(httpStatusCodes.OK)
    .json({
      status: "success",
      msg: "Signout successful.",
    });
};
