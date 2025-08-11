"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
    solvedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("SolvedQuestion", solvedQuestionSchema);
