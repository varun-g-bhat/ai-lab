import express from "express";
import {
  createLab,
  getLabById,
  requestEnrollment,
  changeEnrollment,
  getAllEnrollments,
  getEnrolledLabs,
  getAllLabs,
  getLabCreatedBy,
  getPendingLabs,
  approveLab,
} from "./labController";
import authenticate, { AuthRequest } from "../middleware/authUser";
import adminAuth, { adminOrTeacherAuth } from "../middleware/adminAuth";
import labModel from "./labModel";
import { get } from "http";

const labRouter = express.Router();

labRouter.post("/create", authenticate, createLab);
labRouter.get("/", authenticate, getLabById);
labRouter.post("/enroll", authenticate, requestEnrollment);
labRouter.put("/enrollment/change", authenticate, changeEnrollment);
labRouter.get("/enrollments", authenticate, getAllEnrollments);
labRouter.get("/enrolled", authenticate, getEnrolledLabs);
labRouter.get("/all", authenticate, getAllLabs);
labRouter.get("/created", authenticate, getLabCreatedBy);
labRouter.get("/pending", adminOrTeacherAuth, getPendingLabs);
labRouter.put("/approve/:labId", adminOrTeacherAuth, approveLab);

// Debug route to create sample pending labs (remove in production)
labRouter.post(
  "/create-sample",
  authenticate,
  async (req: express.Request, res: express.Response) => {
    try {
      const _req = req as AuthRequest;
      const sampleLabs = [
        {
          title: "Sample Lab 1",
          description: "This is a sample lab for testing the approval system",
          sec: "CS101",
          subject: "Computer Science",
          labcode: "SAMPLE001",
          createdBy: _req.userId,
          status: "pending" as const,
        },
        {
          title: "Sample Lab 2",
          description: "Another sample lab for approval testing",
          sec: "CS102",
          subject: "Programming",
          labcode: "SAMPLE002",
          createdBy: _req.userId,
          status: "pending" as const,
        },
      ];

      const createdLabs = await labModel.insertMany(sampleLabs);
      res.json({
        success: true,
        message: "Sample labs created",
        labs: createdLabs,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error creating sample labs", error });
    }
  }
);

export default labRouter;
