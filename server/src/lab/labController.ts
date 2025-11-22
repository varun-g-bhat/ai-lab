import express, { NextFunction, Request, Response } from "express";
import labModel from "./labModel";
import createHttpError from "http-errors";
import { AuthRequest } from "../types/auth";
import randomstring from "randomstring";
import enrolledModel from "./enrolledModel";
import authModel from "../auth/authModel";

const createLab = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, sec, subject } = req.body;
  const _req = req as AuthRequest;

  console.log("body", req.body);

  if (!title || !description || !sec || !subject) {
    return next(createHttpError(400, "All fields are required"));
  }
  const labCode = randomstring.generate({
    length: 10,
    charset: "alphabetic",
  });

  console.log("_req", _req);
  try {
    const lab = await labModel.create({
      title,
      description,
      sec,
      subject,
      labcode: labCode,
      createdBy: _req.userId,
      status: "pending", // Explicitly set status to pending
    });

    console.log("Lab created successfully:", lab.title, "Status:", lab.status);
    res.status(201).json(lab);
  } catch (error) {
    console.error("Error creating lab:", error);
    return next(createHttpError(500, "Error while creating lab"));
  }
};

const getLabById = async (req: Request, res: Response, next: NextFunction) => {
  const _req = req as AuthRequest;

  try {
    const lab = await labModel.findOne({ createdBy: _req.userId });
    if (!lab) {
      return next(createHttpError(404, "Lab not found"));
    }
    res.status(200).json(lab);
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error fetching lab details"));
  }
};

const requestEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { labId } = req.body;
  const _req = req as AuthRequest;

  if (!labId) {
    return next(createHttpError(400, "Lab ID is required"));
  }

  try {
    const enrollment = await enrolledModel.create({
      userId: _req.userId,
      labId,
      status: "requested",
    });
    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error requesting enrollment"));
  }
};

const changeEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { enrollmentId, status } = req.body;
  const _req = req as AuthRequest;
  if (!enrollmentId) {
    return next(createHttpError(400, "Enrollment ID is required"));
  }
  try {
    const enrollment = await enrolledModel.findByIdAndUpdate(
      enrollmentId,
      { status },
      { new: true }
    );
    if (!enrollment) {
      return next(createHttpError(404, "Enrollment not found"));
    }
    res.status(200).json(enrollment);
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error approving enrollment"));
  }
};

const getAllEnrollments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _req = req as AuthRequest;

  try {
    const lab = await labModel.findOne({ createdBy: _req.userId });

    if (!lab) {
      return next(createHttpError(404, "Lab not found"));
    }

    const enrollments = await enrolledModel.find({ labId: lab._id });

    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({ message: "No enrollments found" });
    }

    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error fetching enrollments"));
  }
};

const getEnrolledLabs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _req = req as AuthRequest;

  try {
    // Only fetch enrollments with status 'approved'
    const enrollments = await enrolledModel.find({
      userId: _req.userId,
      status: "approved",
    });
    const labIds = enrollments.map((enrollment) => enrollment.labId);
    const labs = await labModel.find({ _id: { $in: labIds } });
    res.status(200).json(labs);
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error fetching enrolled labs"));
  }
};

const getAllLabs = async (req: Request, res: Response, next: NextFunction) => {
  const _req = req as AuthRequest;

  try {
    const labs = await labModel.find();
    res.status(200).json(labs);
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error fetching labs"));
  }
};

const getLabCreatedBy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _req = req as AuthRequest;

  try {
    const labs = await labModel.find({ createdBy: _req.userId });
    if (!labs || labs.length === 0) {
      return next(createHttpError(404, "No labs found"));
    }
    res.status(200).json(labs);
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error fetching lab details"));
  }
};

const getLabCreator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _req = req as AuthRequest;
  const { labId } = req.body;

  try {
    const lab = await labModel.findOne({ _id: labId });
    if (!lab) {
      return next(createHttpError(404, "Lab not found"));
    }

    res.status(200).json(lab.createdBy);
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error fetching lab creator"));
  }
};

export const getPendingLabs = async (req: Request, res: Response) => {
  try {
    const _req = req as AuthRequest;
    console.log("Fetching pending labs...");

    // Get user details to check role
    const user = await authModel.findById(_req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let query: any = { status: "pending" };

    // If user is not admin, only show labs they created
    if (user.userDetails.role !== "admin") {
      query.createdBy = _req.userId;
    }

    const pendingLabs = await labModel
      .find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 }); // Sort by newest first

    console.log(
      `Found ${pendingLabs.length} pending labs for user role: ${user.userDetails.role}`
    );

    res.status(200).json({
      success: true,
      labs: pendingLabs,
      count: pendingLabs.length,
      userRole: user.userDetails.role,
    });
  } catch (error) {
    console.error("Error fetching pending labs:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching pending labs",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

export const approveLab = async (req: Request, res: Response) => {
  try {
    const { labId } = req.params;
    const { action } = req.body; // 'approve' or 'reject'
    const _req = req as AuthRequest;

    console.log(
      `Lab approval request: ${action} lab ${labId} by user ${_req.userId}`
    );

    if (!action || !["approve", "reject"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid action. Must be 'approve' or 'reject'",
      });
    }

    // Get user details to check role
    const user = await authModel.findById(_req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the lab first to check ownership
    const lab = await labModel
      .findById(labId)
      .populate("createdBy", "name email");
    if (!lab) {
      return res.status(404).json({
        success: false,
        message: "Lab not found",
      });
    }

    // If user is not admin, check if they are the creator of the lab
    if (
      user.userDetails.role !== "admin" &&
      lab.createdBy.toString() !== _req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only approve labs that you created",
      });
    }

    // Update the lab status
    const updatedLab = await labModel
      .findByIdAndUpdate(
        labId,
        { status: action === "approve" ? "approved" : "rejected" },
        { new: true }
      )
      .populate("createdBy", "name email");

    console.log(
      `Lab ${action}d successfully by ${user.userDetails.role}:`,
      updatedLab?.title
    );

    res.status(200).json({
      success: true,
      message: `Lab ${action}d successfully`,
      lab: updatedLab,
    });
  } catch (error) {
    console.error("Error approving lab:", error);
    res.status(500).json({
      success: false,
      message: "Server error while processing lab approval",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

export {
  createLab,
  getLabById,
  requestEnrollment,
  changeEnrollment,
  getAllEnrollments,
  getEnrolledLabs,
  getAllLabs,
  getLabCreatedBy,
  getLabCreator,
};
