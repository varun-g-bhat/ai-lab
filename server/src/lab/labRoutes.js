"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const labController_1 = require("./labController");
const authUser_1 = __importDefault(require("../middleware/authUser"));
const labRouter = express_1.default.Router();
labRouter.post("/create", authUser_1.default, labController_1.createLab);
labRouter.get("/", authUser_1.default, labController_1.getLabById);
labRouter.post("/enroll", authUser_1.default, labController_1.requestEnrollment);
labRouter.put("/enrollment/change", authUser_1.default, labController_1.changeEnrollment);
labRouter.get("/enrollments", authUser_1.default, labController_1.getAllEnrollments);
labRouter.get("/enrolled", authUser_1.default, labController_1.getEnrolledLabs);
labRouter.get("/all", authUser_1.default, labController_1.getAllLabs);
labRouter.get("/created", authUser_1.default, labController_1.getLabCreatedBy);
exports.default = labRouter;
