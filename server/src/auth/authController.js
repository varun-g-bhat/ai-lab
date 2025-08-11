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
exports.changeRole = exports.getAllUsers = exports.logoutUser = exports.verifyUser = exports.loginUser = exports.createUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const authModel_1 = __importDefault(require("./authModel"));
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield authModel_1.default.findOne({ email });
        if (user) {
            const error = (0, http_errors_1.default)(400, "User already exists with this email.");
            return next(error);
        }
    }
    catch (err) {
        console.log(err);
        return next((0, http_errors_1.default)(500, "Error while getting user"));
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield authModel_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
        const token = (0, jsonwebtoken_1.sign)({ sub: newUser._id }, process.env.SECRET_KEY, {
            expiresIn: "7d",
            algorithm: "HS256",
        });
        res.status(201).json({ accessToken: token });
    }
    catch (err) {
        return next((0, http_errors_1.default)(500, "Error while creating user"));
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next((0, http_errors_1.default)(400, "All fields are required"));
        }
        const user = yield authModel_1.default.findOne({ email });
        if (!user) {
            return next((0, http_errors_1.default)(404, "User doesn't exist with this email"));
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return next((0, http_errors_1.default)(400, "Invalid credentials"));
        }
        const token = (0, jsonwebtoken_1.sign)({ sub: user._id }, process.env.SECRET_KEY, {
            expiresIn: "7d",
            algorithm: "HS256",
        });
        const oneMonthInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: "/",
        });
        res.json({
            accessToken: token,
            userId: user._id,
            userDetails: user.userDetails,
        });
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, "Error while LoginIn the user"));
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: "Logout successful." });
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, "Error while LogOut the user"));
    }
});
exports.logoutUser = logoutUser;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY, {}, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data) {
            const user = yield authModel_1.default.findOne({ _id: data.sub });
            res.json({
                data: data,
                userId: user === null || user === void 0 ? void 0 : user._id,
                userDetails: user === null || user === void 0 ? void 0 : user.userDetails,
            });
        }
        if (err) {
            res.json({ message: "Not Authorized!", ok: false });
        }
    }));
});
exports.verifyUser = verifyUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield authModel_1.default.find();
        // Extract name and role for each user
        const usersWithNameAndRole = users.map((user) => ({
            _id: user._id,
            email: user.email,
            name: user.userDetails.name,
            role: user.userDetails.role,
        }));
        res.json(usersWithNameAndRole);
        console.log(usersWithNameAndRole);
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, "Error while fetching users"));
    }
});
exports.getAllUsers = getAllUsers;
const changeRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, newRole } = req.body;
    try {
        const user = yield authModel_1.default.findById(userId);
        if (!user) {
            return next((0, http_errors_1.default)(404, "User not found"));
        }
        user.userDetails.role = newRole;
        yield user.save();
        res.status(200).json({ message: "User role updated successfully" });
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, "Error while updating user role"));
    }
});
exports.changeRole = changeRole;
