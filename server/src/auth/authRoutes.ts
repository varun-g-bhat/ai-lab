import express from "express";
import {
  changeRole,
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
  updateProfile,
  verifyUser,
  changePassword,
} from "./authController";
import userValidationRules from "../validator/userValidator";
import validate from "../middleware/validate";
import authenticate from "../middleware/authUser";

const authRouter = express.Router();

// Authentication Routes
authRouter.post("/signup", userValidationRules(), validate, createUser);
authRouter.post("/login", loginUser);
authRouter.post("/verify", verifyUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/all-users", getAllUsers);
authRouter.post("/change-role", changeRole);
authRouter.put("/profile", authenticate, updateProfile);
authRouter.put("/change-password", authenticate, changePassword);

export default authRouter;
