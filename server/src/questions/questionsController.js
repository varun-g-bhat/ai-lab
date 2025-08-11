"use strict";
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
exports.questionSolved = exports.getQuestionByLabId = exports.getQuestionById = exports.deleteQuestion = exports.updateQuestion = exports.createQuestion = void 0;
const questionsModel_1 = __importDefault(require("./questionsModel"));
const http_errors_1 = __importDefault(require("http-errors"));
const solvedModel_1 = __importDefault(require("./solvedModel"));
const createQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, labId, exInput, exOutput } = req.body;
    try {
        const newQuestion = yield questionsModel_1.default.create({
            title,
            description,
            labId,
            exInput,
            exOutput,
        });
        if (!newQuestion) {
            return next((0, http_errors_1.default)(400, "Failed to create question"));
        }
        res.status(201).json(newQuestion);
    }
    catch (error) {
        next(error);
    }
});
exports.createQuestion = createQuestion;
const updateQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, exInput, exOutput } = req.body;
    try {
        const updatedQuestion = yield questionsModel_1.default.findByIdAndUpdate(id, { title, description, exInput, exOutput }, { new: true });
        if (!updatedQuestion) {
            return next((0, http_errors_1.default)(404, "Question not found"));
        }
        res.status(200).json(updatedQuestion);
    }
    catch (error) {
        next(error);
    }
});
exports.updateQuestion = updateQuestion;
const deleteQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedQuestion = yield questionsModel_1.default.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return next((0, http_errors_1.default)(404, "Question not found"));
        }
        res.status(200).json({ message: "Question deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteQuestion = deleteQuestion;
const getQuestionByLabId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { labId } = req.params;
    try {
        const questions = yield questionsModel_1.default.find({ labId });
        if (!questions || questions.length === 0) {
            return next((0, http_errors_1.default)(404, "No questions found for this lab"));
        }
        res.status(200).json(questions);
    }
    catch (error) {
        next(error);
    }
});
exports.getQuestionByLabId = getQuestionByLabId;
const questionSolved = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId } = req.body;
    const _req = req;
    try {
        const question = yield questionsModel_1.default.findById(questionId);
        const labId = question === null || question === void 0 ? void 0 : question.labId;
        const existingSolved = yield solvedModel_1.default.findOne({
            questionId,
            userId: _req.userId,
            labId,
        });
        if (existingSolved) {
            yield solvedModel_1.default.updateOne({ _id: existingSolved._id }, { solvedAt: new Date() });
            return res.status(201).json(existingSolved);
        }
        if (!questionId || !_req.userId) {
            return next((0, http_errors_1.default)(400, "Question ID and User ID are required"));
        }
        const solvedQuestion = yield solvedModel_1.default.create({
            questionId,
            userId: _req.userId,
            labId,
            solvedAt: new Date(),
        });
        res.status(201).json(solvedQuestion);
    }
    catch (error) {
        next(error);
    }
});
exports.questionSolved = questionSolved;
const getQuestionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const question = yield questionsModel_1.default.findById(id);
        if (!question) {
            return next((0, http_errors_1.default)(404, "Question not found"));
        }
        const data = {
            title: question.title,
            description: question.description,
            exInput: question.exInput,
            exOutput: question.exOutput,
        };
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.getQuestionById = getQuestionById;
