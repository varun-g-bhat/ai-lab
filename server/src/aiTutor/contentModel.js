"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contentSchema = new mongoose_1.default.Schema({
    roadMapId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'roadmaps',
        required: true
    },
    lessonId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});
exports.default = mongoose_1.default.model('roadMapContent', contentSchema);
