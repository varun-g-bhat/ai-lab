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
exports.generate_hints = exports.compileCode = void 0;
const axios_1 = __importDefault(require("axios"));
const http_errors_1 = __importDefault(require("http-errors"));
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
        const hints = yield axios_1.default.post(`${process.env.PYTHON_BACKEND_URL}/aitutor/generate/hints`, {}, {
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
