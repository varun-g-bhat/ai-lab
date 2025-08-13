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
exports.getSubmissionHistory = exports.questionSolved = exports.getQuestionByLabId = exports.getQuestionById = exports.deleteQuestion = exports.updateQuestion = exports.createQuestion = void 0;
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
    const { questionId, code, language, output, expectedOutput, isCorrect } = req.body;
    const _req = req;
    try {
        const question = yield questionsModel_1.default.findById(questionId);
        if (!question) {
            return next((0, http_errors_1.default)(404, "Question not found"));
        }
        const labId = question.labId;
        // Create submission object
        const newSubmission = {
            code,
            language,
            output,
            expectedOutput,
            isCorrect,
            submittedAt: new Date(),
        };
        // Find existing solved question record
        let existingSolved = yield solvedModel_1.default.findOne({
            questionId,
            userId: _req.userId,
            labId,
        });
        if (existingSolved) {
            // Add new submission to existing record
            existingSolved.submissions.push(newSubmission);
            existingSolved.totalSubmissions += 1;
            existingSolved.lastSubmittedAt = new Date();
            // If this is the first correct submission, mark as solved
            if (isCorrect && !existingSolved.isSolved) {
                existingSolved.isSolved = true;
                existingSolved.firstSolvedAt = new Date();
            }
            console.log(existingSolved);
            yield existingSolved.save();
            return res.status(200).json(existingSolved);
        }
        else {
            // Create new solved question record
            const solvedQuestion = yield solvedModel_1.default.create({
                questionId,
                userId: _req.userId,
                labId,
                submissions: [newSubmission],
                totalSubmissions: 1,
                lastSubmittedAt: new Date(),
                isSolved: isCorrect,
                firstSolvedAt: isCorrect ? new Date() : undefined,
            });
            console.log(solvedQuestion);
            return res.status(201).json(solvedQuestion);
        }
    }
    catch (error) {
        console.error("Error in questionSolved:", error);
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
const getSubmissionHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId } = req.params;
    const _req = req;
    try {
        const submissionHistory = yield solvedModel_1.default
            .findOne({
            questionId,
            userId: _req.userId,
        })
            .select("submissions totalSubmissions isSolved firstSolvedAt lastSubmittedAt");
        if (!submissionHistory) {
            return res.status(200).json({
                submissions: [],
                totalSubmissions: 0,
                isSolved: false,
                message: "No submissions found for this question",
            });
        }
        res.status(200).json(submissionHistory);
    }
    catch (error) {
        console.error("Error fetching submission history:", error);
        next(error);
    }
});
exports.getSubmissionHistory = getSubmissionHistory;
