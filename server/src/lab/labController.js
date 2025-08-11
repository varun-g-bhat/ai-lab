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
exports.getLabCreator = exports.getLabCreatedBy = exports.getAllLabs = exports.getEnrolledLabs = exports.getAllEnrollments = exports.changeEnrollment = exports.requestEnrollment = exports.getLabById = exports.createLab = void 0;
const labModel_1 = __importDefault(require("./labModel"));
const http_errors_1 = __importDefault(require("http-errors"));
const randomstring_1 = __importDefault(require("randomstring"));
const enrolledModel_1 = __importDefault(require("./enrolledModel"));
const createLab = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, sec, subject } = req.body;
    const _req = req;
    console.log("body", req.body);
    if (!title || !description || !sec || !subject) {
        return next((0, http_errors_1.default)(400, "All fields are required"));
    }
    const labCode = randomstring_1.default.generate({
        length: 10,
        charset: "alphabetic",
    });
    console.log("_req", _req);
    try {
        const lab = yield labModel_1.default.create({
            title,
            description,
            sec,
            subject,
            labcode: labCode,
            createdBy: _req.userId,
        });
        res.status(201).json(lab);
    }
    catch (error) {
        console.error(error);
        return next((0, http_errors_1.default)(500, "Error while creating lab"));
    }
});
exports.createLab = createLab;
const getLabById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _req = req;
    try {
        const lab = yield labModel_1.default.findOne({ createdBy: _req.userId });
        if (!lab) {
            return next((0, http_errors_1.default)(404, "Lab not found"));
        }
        res.status(200).json(lab);
    }
    catch (error) {
        console.error(error);
        return next((0, http_errors_1.default)(500, "Error fetching lab details"));
    }
});
exports.getLabById = getLabById;
const requestEnrollment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { labId } = req.body;
    const _req = req;
    if (!labId) {
        return next((0, http_errors_1.default)(400, "Lab ID is required"));
    }
    try {
        const enrollment = yield enrolledModel_1.default.create({
            userId: _req.userId,
            labId,
            status: "requested",
        });
        res.status(201).json(enrollment);
    }
    catch (error) {
        console.error(error);
        return next((0, http_errors_1.default)(500, "Error requesting enrollment"));
    }
});
exports.requestEnrollment = requestEnrollment;
const changeEnrollment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { enrollmentId, status } = req.body;
    const _req = req;
    if (!enrollmentId) {
        return next((0, http_errors_1.default)(400, "Enrollment ID is required"));
    }
    try {
        const enrollment = yield enrolledModel_1.default.findByIdAndUpdate(enrollmentId, { status }, { new: true });
        if (!enrollment) {
            return next((0, http_errors_1.default)(404, "Enrollment not found"));
        }
        res.status(200).json(enrollment);
    }
    catch (error) {
        console.error(error);
        return next((0, http_errors_1.default)(500, "Error approving enrollment"));
    }
});
exports.changeEnrollment = changeEnrollment;
const getAllEnrollments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _req = req;
    try {
        const lab = yield labModel_1.default.findOne({ createdBy: _req.userId });
        if (!lab) {
            return next((0, http_errors_1.default)(404, "Lab not found"));
        }
        const enrollments = yield enrolledModel_1.default.find({ labId: lab._id });
        if (!enrollments || enrollments.length === 0) {
            return res.status(404).json({ message: "No enrollments found" });
        }
        res.status(200).json(enrollments);
    }
    catch (error) {
        console.error(error);
        return next((0, http_errors_1.default)(500, "Error fetching enrollments"));
    }
});
exports.getAllEnrollments = getAllEnrollments;
const getEnrolledLabs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _req = req;
    try {
        const enrollments = yield enrolledModel_1.default.find({ userId: _req.userId });
        const labIds = enrollments.map((enrollment) => enrollment.labId);
        const labs = yield labModel_1.default.find({ _id: { $in: labIds } });
        res.status(200).json(labs);
    }
    catch (error) {
        console.error(error);
        return next((0, http_errors_1.default)(500, "Error fetching enrolled labs"));
    }
});
exports.getEnrolledLabs = getEnrolledLabs;
const getAllLabs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _req = req;
    try {
        const labs = yield labModel_1.default.find();
        res.status(200).json(labs);
    }
    catch (error) {
        console.error(error);
        return next((0, http_errors_1.default)(500, "Error fetching labs"));
    }
});
exports.getAllLabs = getAllLabs;
const getLabCreatedBy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _req = req;
    try {
        const labs = yield labModel_1.default.find({ createdBy: _req.userId });
        if (!labs || labs.length === 0) {
            return next((0, http_errors_1.default)(404, "No labs found"));
        }
        res.status(200).json(labs);
    }
    catch (error) {
        console.error(error);
        return next((0, http_errors_1.default)(500, "Error fetching lab details"));
    }
});
exports.getLabCreatedBy = getLabCreatedBy;
const getLabCreator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _req = req;
    const { labId } = req.body;
    try {
        const lab = yield labModel_1.default.findOne({ _id: labId });
        if (!lab) {
            return next((0, http_errors_1.default)(404, "Lab not found"));
        }
        res.status(200).json(lab.createdBy);
    }
    catch (error) {
        console.error(error);
        return next((0, http_errors_1.default)(500, "Error fetching lab creator"));
    }
});
exports.getLabCreator = getLabCreator;
