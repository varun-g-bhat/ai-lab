"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("./authController");
const userValidator_1 = __importDefault(require("../validator/userValidator"));
const validate_1 = __importDefault(require("../middleware/validate"));
const authRouter = express_1.default.Router();
// Authentication Routes
authRouter.post("/signup", (0, userValidator_1.default)(), validate_1.default, authController_1.createUser);
authRouter.post("/login", authController_1.loginUser);
authRouter.post("/verify", authController_1.verifyUser);
authRouter.post("/logout", authController_1.logoutUser);
authRouter.get("/all-users", authController_1.getAllUsers);
authRouter.post("/change-role", authController_1.changeRole);
exports.default = authRouter;
