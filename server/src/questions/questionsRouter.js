"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionsController_1 = require("./questionsController");
const authUser_1 = __importDefault(require("../middleware/authUser"));
const questionsRouter = express_1.default.Router();
questionsRouter.post("/create", authUser_1.default, questionsController_1.createQuestion);
questionsRouter.put("/update/:id", authUser_1.default, questionsController_1.updateQuestion);
questionsRouter.delete("/delete/:id", authUser_1.default, questionsController_1.deleteQuestion);
questionsRouter.get("/lab/:labId", authUser_1.default, questionsController_1.getQuestionByLabId);
questionsRouter.post("/solve", authUser_1.default, questionsController_1.questionSolved);
questionsRouter.get("/submissions/:questionId", authUser_1.default, questionsController_1.getSubmissionHistory);
questionsRouter.get("/:id", authUser_1.default, questionsController_1.getQuestionById);
exports.default = questionsRouter;
