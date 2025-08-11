"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enrolledSchema = new mongoose_1.default.Schema({
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
    status: {
        type: String,
        enum: ["requested", "approved", "rejected"],
        default: "requested",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("EnrolledModel", enrolledSchema);
