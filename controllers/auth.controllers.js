import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/.env.js";

//req body -> object containing data from the client (POST)

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //create a new user

    const { name, email, password } = req.body;

    //if user exists?
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.status = 409;
      throw error;
    }
    //hash passwd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session },
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "user created successfully.",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    next(error);
  }
};

export const signIn = async (req, res, next) => {
  //logic
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User metit");
      error.status = 404;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const signOut = async (req, res, next) => {
  //logic
};
