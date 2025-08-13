"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const submissionSchema = new mongoose_1.default.Schema({
    code: { type: String, required: true },
    language: { type: String, required: true },
    output: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    submittedAt: { type: Date, default: Date.now },
});
const solvedQuestionSchema = new mongoose_1.default.Schema({
    questionId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    labId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Lab",
        required: true,
    },
    submissions: [submissionSchema],
    firstSolvedAt: { type: Date },
    lastSubmittedAt: { type: Date, default: Date.now },
    totalSubmissions: { type: Number, default: 0 },
    isSolved: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("SolvedQuestion", solvedQuestionSchema);
