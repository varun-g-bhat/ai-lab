"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const authRoutes_1 = __importDefault(require("./auth/authRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const aiTutorRoutes_1 = __importDefault(require("./aiTutor/aiTutorRoutes"));
const resourceRoute_1 = __importDefault(require("./resourceSharing/resourceRoute"));
const codeCompilerRoutes_1 = __importDefault(require("./codeCompiler/codeCompilerRoutes"));
const labRoutes_1 = __importDefault(require("./lab/labRoutes"));
const questionsRouter_1 = __importDefault(require("./questions/questionsRouter"));
const mergeAllRouter_1 = __importDefault(require("./helper/mergeAllRouter"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.server = server;
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL,
//   },
// });
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to AI Lab Companion Express Backend - Developed By MY3S",
    });
});
app.use("/api/v1/auth", authRoutes_1.default);
// app.use("/api/v1/discussion", discussionRouter);
app.use("/api/v1/ai-tutor", aiTutorRoutes_1.default);
app.use("/api/v1/resource", resourceRoute_1.default);
app.use("/api/v1/compiler", codeCompilerRoutes_1.default);
app.use("/api/v1/lab", labRoutes_1.default);
app.use("/api/v1/questions", questionsRouter_1.default);
app.use("/api/v1/merge-all", mergeAllRouter_1.default);
app.use(globalErrorHandler_1.default);
