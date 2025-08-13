"use strict";
// import express, { NextFunction, Request, Response } from "express";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchQuiz = exports.generateQuiz = exports.generate_hints = exports.compileCode = void 0;
const axios_1 = __importDefault(require("axios"));
const http_errors_1 = __importDefault(require("http-errors"));
const quizModel_1 = __importDefault(require("./quizModel"));
const solvedModel_1 = __importDefault(require("../questions/solvedModel"));
const questionsModel_1 = __importDefault(require("../questions/questionsModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const languageMap = {
    c: { language: "c", version: "10.2.0" },
    cpp: { language: "c++", version: "10.2.0" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" },
};
const compileCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, language, input } = req.body;
    if (!languageMap[language]) {
        return res.status(400).json({ error: "Unsupported language" });
    }
    const { language: lang, version } = languageMap[language];
    const payload = {
        language: lang,
        version,
        files: [{ name: "main", content: code }],
        stdin: input || "",
    };
    const apiUrl = process.env.PISTON_API_URL || "https://emkc.org/api/v2/piston/execute";
    const axiosConfig = {
        method: "post",
        url: apiUrl,
        headers: { "Content-Type": "application/json" },
        data: payload,
        timeout: Number(process.env.API_TIMEOUT_MS) || 10000,
    };
    try {
        const response = yield (0, axios_1.default)(axiosConfig);
        const runResult = response.data.run;
        return res.status(200).json(runResult);
    }
    catch (err) {
        console.error("Compilation API error:", err.message || err);
        return res.status(502).json({ error: "Failed to compile code" });
    }
});
exports.compileCode = compileCode;
const generate_hints = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _req = req;
        const { question, code } = req.body;
        const hints = yield axios_1.default.post(`${process.env.PYTHON_BACKEND_URL}/api/v1/aitutor/generate/hints`, {}, {
            params: {
                question,
                code,
            },
        });
        res.json(hints.data);
    }
    catch (error) {
        console.error("Error generating hints:", error);
        return next((0, http_errors_1.default)(500, "Error while generating hints"));
    }
});
exports.generate_hints = generate_hints;
const generateQuiz = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _req = req;
        const { questionId } = req.body;
        console.log("User ID:", _req.userId);
        console.log("Question ID from request:", questionId);
        console.log("Question ID type:", typeof questionId);
        // Validate questionId
        if (!questionId || !mongoose_1.default.Types.ObjectId.isValid(questionId)) {
            return res.status(400).json({ message: "Invalid question ID" });
        }
        // Check if user has solved this question using the new schema
        const solvedRecord = yield solvedModel_1.default.findOne({
            questionId: new mongoose_1.default.Types.ObjectId(questionId),
            userId: new mongoose_1.default.Types.ObjectId(_req.userId),
            isSolved: true, // Only allow quiz generation if question is actually solved
        });
        console.log("Solved Record found:", !!solvedRecord);
        console.log("Solved Record details:", solvedRecord);
        if (solvedRecord) {
            // Query the problem
            const problem = yield questionsModel_1.default.findById(questionId);
            console.log("Found problem:", !!problem);
            if (problem) {
                const response = yield axios_1.default.post(`${process.env.PYTHON_BACKEND_URL}/api/v1/aitutor/generatequiz`, { question: problem.description });
                console.log("Python backend response:", response.data);
                const savedQuiz = yield quizModel_1.default.create(Object.assign(Object.assign({}, response.data), { userId: _req.userId, questionId: questionId }));
                console.log("Saved quiz:", savedQuiz);
                res.status(200).json(response.data);
            }
            else {
                res.status(404).json({ message: "Question not found" });
            }
        }
        else {
            // Let's also check what records exist for debugging
            const allRecords = yield solvedModel_1.default.find({
                questionId: new mongoose_1.default.Types.ObjectId(questionId),
                userId: new mongoose_1.default.Types.ObjectId(_req.userId),
            });
            console.log("All solved records for this question and user:", allRecords);
            res.status(200).json({
                message: "Please solve the question correctly to get the quiz questions",
                debug: {
                    questionId,
                    userId: _req.userId,
                    foundRecords: allRecords.length,
                    solvedRecords: allRecords.filter((r) => r.isSolved).length,
                },
            });
        }
    }
    catch (error) {
        console.error("Error in generateQuiz:", error);
        return next((0, http_errors_1.default)(500, "Error generating the content"));
    }
});
exports.generateQuiz = generateQuiz;
const fetchQuiz = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _req = req;
        // Get questionId from query params since it's a GET request
        const { questionId } = req.query;
        console.log("Fetching quiz for user:", _req.userId, "question:", questionId);
        const quiz = yield quizModel_1.default.find(Object.assign({ userId: _req.userId }, (questionId && { questionId: questionId })));
        console.log("Found quiz:", quiz);
        res.status(200).json(quiz);
    }
    catch (error) {
        console.error("Error fetching quiz:", error);
        return next((0, http_errors_1.default)(500, "Error fetching the quiz"));
    }
});
exports.fetchQuiz = fetchQuiz;
