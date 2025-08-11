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
exports.deleteResource = exports.getSingleResource = exports.listResources = exports.createResource = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const resourceModel_1 = __importDefault(require("./resourceModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const http_errors_1 = __importDefault(require("http-errors"));
const createResource = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, tags, description } = req.body;
    console.log(req.body);
    const files = req.files;
    if (!files.coverImage || !files.file) {
        return next((0, http_errors_1.default)(400, "Cover image or resource file is missing."));
    }
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = node_path_1.default.resolve(__dirname, "../../public/data/uploads", fileName);
    try {
        const uploadResult = yield cloudinary_1.default.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "resource-covers",
            format: coverImageMimeType,
        });
        const resourceFileName = files.file[0].filename;
        const resourceFilePath = node_path_1.default.resolve(__dirname, "../../public/data/uploads", resourceFileName);
        const resourceFileUploadResult = yield cloudinary_1.default.uploader.upload(resourceFilePath, {
            resource_type: "raw",
            filename_override: resourceFileName,
            folder: "resource-pdfs",
            format: "pdf",
        });
        const _req = req;
        const newresource = yield resourceModel_1.default.create({
            title,
            description,
            tags,
            author: _req.userId,
            coverImage: uploadResult.secure_url,
            file: resourceFileUploadResult.secure_url,
        });
        yield node_fs_1.default.promises.unlink(filePath);
        yield node_fs_1.default.promises.unlink(resourceFilePath);
        res.status(201).json({ message: "Resource uploaded successfully!", id: newresource._id });
    }
    catch (err) {
        console.log(err);
        return next((0, http_errors_1.default)(500, "Error while uploading the files."));
    }
});
exports.createResource = createResource;
const listResources = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = yield resourceModel_1.default.find().populate("author", "userDetails");
        res.json(resource);
    }
    catch (err) {
        return next((0, http_errors_1.default)(500, "Error while getting a resource"));
    }
});
exports.listResources = listResources;
const getSingleResource = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resourceId = req.params.resourceId;
    try {
        const resource = yield resourceModel_1.default
            .findOne({ _id: resourceId })
            .populate("author", "userDetails");
        if (!resource) {
            return next((0, http_errors_1.default)(404, "resource not found."));
        }
        return res.json(resource);
    }
    catch (err) {
        return next((0, http_errors_1.default)(500, "Error while getting a resource"));
    }
});
exports.getSingleResource = getSingleResource;
const deleteResource = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const resourceId = req.params.resourceId;
    const resource = yield resourceModel_1.default.findOne({ _id: resourceId });
    if (!resource) {
        return next((0, http_errors_1.default)(404, "resource not found"));
    }
    const _req = req;
    console.log(resource.author.toString(), _req.userId);
    if (resource.author.toString() !== _req.userId) {
        return next((0, http_errors_1.default)(403, "You can not update others resource."));
    }
    const coverFileSplits = resource.coverImage.split("/");
    const coverImagePublicId = coverFileSplits.at(-2) +
        "/" +
        ((_a = coverFileSplits.at(-1)) === null || _a === void 0 ? void 0 : _a.split(".").at(-2));
    const resourceFileSplits = resource.file.split("/");
    const resourceFilePublicId = resourceFileSplits.at(-2) + "/" + resourceFileSplits.at(-1);
    yield cloudinary_1.default.uploader.destroy(coverImagePublicId);
    yield cloudinary_1.default.uploader.destroy(resourceFilePublicId, {
        resource_type: "raw",
    });
    yield resourceModel_1.default.deleteOne({ _id: resourceId });
    res.status(204).json({ message: "Resource deleted successfully!" });
});
exports.deleteResource = deleteResource;
