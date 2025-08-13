"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const codeCompilerConrtoller_1 = require("./codeCompilerConrtoller");
const authUser_1 = __importDefault(require("../middleware/authUser"));
const compileRouter = express_1.default.Router();
compileRouter.post("/compile", codeCompilerConrtoller_1.compileCode);
compileRouter.post("/hints", codeCompilerConrtoller_1.generate_hints);
compileRouter.post("/quiz", authUser_1.default, codeCompilerConrtoller_1.generateQuiz);
compileRouter.get("/quiz", authUser_1.default, codeCompilerConrtoller_1.fetchQuiz);
exports.default = compileRouter;
