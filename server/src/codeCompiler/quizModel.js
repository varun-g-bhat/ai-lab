"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const QuestionItemSchema = new mongoose_1.default.Schema({
    questionNo: { type: Number, required: true },
    question: { type: String, required: true },
    options: { type: [String], default: [] },
    answer: { type: String, required: true },
});
const QuizSchema = new mongoose_1.default.Schema({
    testName: { type: String, required: true },
    testDescription: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    questions: { type: [QuestionItemSchema], required: true },
    difficulty: { type: String, required: true },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Quiz", QuizSchema);
