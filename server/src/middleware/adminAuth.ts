import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import authModel from "../auth/authModel";
import labModel from "../lab/labModel";
import { AuthRequest } from "./authUser";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return next(createHttpError(401, "Authorization token is required."));
  }

  try {
    const decoded = verify(token, process.env.SECRET_KEY as string);
    const _req = req as AuthRequest;
    _req.userId = decoded.sub as string;

    // Check if user is admin
    const user = await authModel.findById(_req.userId);
    if (!user) {
      return next(createHttpError(404, "User not found."));
    }

    if (user.userDetails.role !== "admin") {
      return next(createHttpError(403, "Admin access required."));
    }

    next();
  } catch (err) {
    return next(createHttpError(401, "Token expired."));
  }
};

// Middleware that allows both admins and lab creators to access lab approval endpoints
const adminOrTeacherAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return next(createHttpError(401, "Authorization token is required."));
  }

  try {
    const decoded = verify(token, process.env.SECRET_KEY as string);
    const _req = req as AuthRequest;
    _req.userId = decoded.sub as string;

    const user = await authModel.findById(_req.userId);
    if (!user) {
      return next(createHttpError(404, "User not found."));
    }

    // Allow access for admins
    if (user.userDetails.role === "admin") {
      next();
      return;
    }

    // Allow access for teachers
    if (user.userDetails.role === "teacher") {
      next();
      return;
    }

    return next(createHttpError(403, "Teacher or Admin access required."));
  } catch (err) {
    return next(createHttpError(401, "Token expired."));
  }
};

export default adminAuth;
export { adminOrTeacherAuth };