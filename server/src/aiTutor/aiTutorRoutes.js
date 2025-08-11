"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiTutorControllers_1 = require("./aiTutorControllers");
const authUser_1 = __importDefault(require("../middleware/authUser"));
const aiTutorRouter = express_1.default.Router();
// Ai Tutor Routes
aiTutorRouter.post("/roadmap/:topic", authUser_1.default, aiTutorControllers_1.generate_Roadmap);
aiTutorRouter.get("/roadmap", authUser_1.default, aiTutorControllers_1.fetchRoadmap);
aiTutorRouter.get("/roadmap/:id", authUser_1.default, aiTutorControllers_1.fetchRoadmapById);
aiTutorRouter.post("/generatecontent", authUser_1.default, aiTutorControllers_1.generate_content);
aiTutorRouter.get("/getcontent/:id", authUser_1.default, aiTutorControllers_1.fetchContent);
exports.default = aiTutorRouter;
