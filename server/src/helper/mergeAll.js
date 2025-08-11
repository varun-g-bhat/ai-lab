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
exports.teacherDashboard = void 0;
const enrolledModel_1 = __importDefault(require("../lab/enrolledModel"));
const http_errors_1 = __importDefault(require("http-errors"));
const solvedModel_1 = __importDefault(require("../questions/solvedModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const authModel_1 = __importDefault(require("../auth/authModel"));
const teacherDashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _req = req;
    const { labId } = req.query;
    if (!labId ||
        typeof labId !== "string" ||
        !mongoose_1.default.Types.ObjectId.isValid(labId)) {
        return next((0, http_errors_1.default)(400, "Invalid or missing labId"));
    }
    const labObjectId = new mongoose_1.default.Types.ObjectId(labId);
    try {
        const enrollers = yield enrolledModel_1.default.find({
            labId: labId,
            status: "approved",
        });
        if (!enrollers || enrollers.length === 0) {
            return next((0, http_errors_1.default)(404, "No approved enrollers found for this lab"));
        }
        // Extract userIds of approved enrollers
        const userIds = enrollers.map((enroller) => enroller.userId);
        console.log("Approved enroller userIds:", userIds);
        // Perform an aggregation to count solved questions for each user
        const solvedQuestionCounts = yield solvedModel_1.default.aggregate([
            {
                $match: {
                    userId: { $in: userIds }, // Ensure userIds are properly matched as ObjectId
                    labId: new mongoose_1.default.Types.ObjectId(labId), // Ensure labId is matched as ObjectId
                },
            },
            {
                $group: {
                    _id: "$userId", // Group by userId
                    solvedCount: { $sum: 1 }, // Count the number of solved questions
                },
            },
            {
                $project: {
                    userId: "$_id", // Renaming _id to userId
                    solvedCount: 1, // Include the solvedCount in the result
                    _id: 0, // Exclude the _id field from the result
                },
            },
        ]);
        console.log("Solved Question Counts:", solvedQuestionCounts);
        // Updated query to fetch the nested userDetails.name field
        const users = yield authModel_1.default.find({ _id: { $in: userIds } }, { _id: 1, "userDetails.name": 1, email: 1 } // Fetch nested name field
        );
        // Debug: Log userIds and fetched users
        console.log("userIds:", userIds);
        console.log("Fetched users:", users);
        // Create a map of userId to username (access nested userDetails.name)
        const userIdToUsername = {};
        users.forEach((u) => {
            var _a, _b, _c;
            const id = ((_b = (_a = u._id) === null || _a === void 0 ? void 0 : _a.toString) === null || _b === void 0 ? void 0 : _b.call(_a)) || "";
            let name = (_c = u.userDetails) === null || _c === void 0 ? void 0 : _c.name; // Access nested name
            if (!name)
                name = u.email; // Fallback to email if name is missing
            userIdToUsername[id] = name || null;
        });
        // Debug: Log the userIdToUsername map
        console.log("userIdToUsername map:", userIdToUsername);
        // Attach username to each solvedQuestionCounts entry
        const solvedWithNames = solvedQuestionCounts.map((user) => {
            var _a, _b;
            const key = ((_b = (_a = user.userId) === null || _a === void 0 ? void 0 : _a.toString) === null || _b === void 0 ? void 0 : _b.call(_a)) || "";
            const foundUsername = userIdToUsername[key] || null;
            if (!foundUsername) {
                console.warn(`No username found for userId: ${key}`);
            }
            return Object.assign(Object.assign({}, user), { username: foundUsername });
        });
        // Debug: Log the final solvedWithNames array
        console.log("solvedWithNames:", solvedWithNames);
        res.status(200).json(solvedWithNames);
    }
    catch (error) {
        console.error(error);
        return next((0, http_errors_1.default)(500, "Error fetching labs"));
    }
});
exports.teacherDashboard = teacherDashboard;
