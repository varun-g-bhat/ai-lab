"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LessonSchema = new mongoose_1.default.Schema({
    lessonNumber: {
        type: Number,
        required: true
    },
    lessonName: {
        type: String,
        required: true
    },
    objective: {
        type: String,
        required: true
    },
    topic: [
        {
            type: String,
            required: true
        }
    ]
});
const RoadMapSchema = new mongoose_1.default.Schema({
    Image: {
        type: String,
        required: true
    },
    RoadMapFor: {
        type: String,
        required: true
    },
    Outcome: {
        type: String,
        required: true
    },
    RoadMap: [LessonSchema],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('RoadMap', RoadMapSchema);
