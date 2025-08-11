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
exports.fetchContent = exports.generate_content = exports.fetchRoadmapById = exports.fetchRoadmap = exports.generate_Roadmap = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
const roadmapModel_1 = __importDefault(require("./roadmapModel"));
const contentModel_1 = __importDefault(require("./contentModel"));
(0, dotenv_1.config)();
const generate_Roadmap = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _req = req;
        const { topic } = req.params;
        const response = yield axios_1.default.post(`${process.env.PYTHON_BACKEND_URL}/aitutor/roadmap`, {}, {
            params: {
                topic,
            },
        });
        const roadmap = yield roadmapModel_1.default.create(Object.assign(Object.assign({}, response.data), { userId: _req.userId }));
        res.send(roadmap);
    }
    catch (error) {
        console.log(error);
        return next((0, http_errors_1.default)(500, "Error while creating a roadmap"));
    }
});
exports.generate_Roadmap = generate_Roadmap;
const fetchRoadmap = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _req = req;
        const roadmap = yield roadmapModel_1.default.find({ userId: _req.userId });
        res.status(200).json(roadmap);
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, "Error fetching the roadmap"));
    }
});
exports.fetchRoadmap = fetchRoadmap;
const fetchRoadmapById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const roadmap = yield roadmapModel_1.default.findOne({ _id: id });
        res.status(200).json(roadmap);
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, "Error fetching the roadmap"));
    }
});
exports.fetchRoadmapById = fetchRoadmapById;
const generate_content = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, roadMapId } = req.body;
        console.log(req.body);
        const _req = req;
        const content = yield contentModel_1.default.findOne({ lessonId: _id });
        if (!content) {
            const response = yield axios_1.default.post(`${process.env.PYTHON_BACKEND_URL}/aitutor/roadmap/generatecontent`, req.body);
            const createContent = yield contentModel_1.default.create({
                roadMapId: roadMapId,
                lessonId: _id,
                content: response.data.content,
                userId: _req.userId,
            });
            console.log(response.data.content);
            return res.status(200).json(createContent);
        }
        res.status(200).json(content);
    }
    catch (error) {
        console.log(error);
        return next((0, http_errors_1.default)(500, "Error generating the content"));
    }
});
exports.generate_content = generate_content;
const fetchContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const content = yield contentModel_1.default.findOne({ _id: id });
        res.status(200).json(content);
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, "Error fetching the roadmap"));
    }
});
exports.fetchContent = fetchContent;
