import createHttpError from "http-errors";
import authModel from "./authModel";
import { sign, verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { AuthRequest } from "../types/auth";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await authModel.findOne({ email });
    if (user) {
      const error = createHttpError(
        400,
        "User already exists with this email."
      );
      return next(error);
    }
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "Error while getting user"));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authModel.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = sign({ sub: newUser._id }, process.env.SECRET_KEY as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    res.status(201).json({ accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Error while creating user"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, "All fields are required"));
    }

    const user = await authModel.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "User doesn't exist with this email"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(createHttpError(400, "Invalid credentials"));
    }

    const token = sign({ sub: user._id }, process.env.SECRET_KEY as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    const oneMonthInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    res.cookie("token", token, {
      httpOnly: true, // more secure
      secure: true, // Always true for cross-origin requests
      sameSite: "none", // Required for cross-origin cookies
      path: "/",
      maxAge: oneMonthInMilliseconds,
    });
    res.json({
      accessToken: token,
      userId: user._id,
      userDetails: user.userDetails,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while LoginIn the user"));
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    return next(createHttpError(500, "Error while LogOut the user"));
  }
};

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  verify(token, process.env.SECRET_KEY as string, {}, async (err, data) => {
    if (data) {
      const user = await authModel.findOne({ _id: data.sub });
      res.json({
        data: data,
        userId: user?._id,
        userDetails: user?.userDetails,
      });
    }
    if (err) {
      res.json({ message: "Not Authorized!", ok: false });
    }
  });
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await authModel.find();

    // Extract name and role for each user
    const usersWithNameAndRole = users.map((user) => ({
      _id: user._id,
      email: user.email,
      name: user.userDetails.name,
      role: user.userDetails.role,
    }));

    res.json(usersWithNameAndRole);
    console.log(usersWithNameAndRole);
  } catch (error) {
    return next(createHttpError(500, "Error while fetching users"));
  }
};

const changeRole = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, newRole } = req.body;

  try {
    const user = await authModel.findById(userId);
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    user.userDetails.role = newRole;
    await user.save();

    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    return next(createHttpError(500, "Error while updating user role"));
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const _req = req as AuthRequest;

    const userId = _req.userId;
    const { name, email } = _req.body;

    // Check if email is already taken by another user
    const existingUser = await authModel.findOne({
      email,
      _id: { $ne: userId },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const updatedUser = await authModel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, select: "-password" }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const _req = req as AuthRequest;

    const userId = _req.userId;
    const { currentPassword, newPassword } = req.body;

    const user = await authModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await authModel.findByIdAndUpdate(userId, { password: hashedNewPassword });

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export {
  createUser,
  loginUser,
  verifyUser,
  logoutUser,
  getAllUsers,
  changeRole,
};
