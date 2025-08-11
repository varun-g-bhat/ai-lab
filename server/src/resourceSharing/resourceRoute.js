"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const authUser_1 = __importDefault(require("../middleware/authUser"));
const resourceController_1 = require("./resourceController");
const resourceRouter = express_1.default.Router();
const upload = (0, multer_1.default)({
    dest: node_path_1.default.resolve(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 3e7 },
});
resourceRouter.post("/", authUser_1.default, upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
]), resourceController_1.createResource);
resourceRouter.get("/", resourceController_1.listResources);
resourceRouter.get("/:resourceId", resourceController_1.getSingleResource);
resourceRouter.delete("/:resourceId", authUser_1.default, resourceController_1.deleteResource);
exports.default = resourceRouter;
