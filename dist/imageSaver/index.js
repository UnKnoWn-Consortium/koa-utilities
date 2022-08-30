"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const util_1 = require("util");
const stream_1 = __importDefault(require("stream"));
const pipeline = (0, util_1.promisify)(stream_1.default.pipeline);
function imageSaver(files, location = "./data", targetId) {
    if (!Array.isArray(files) ||
        files.length === 0) {
        return [];
    }
    return Promise.all(files
        .filter(({ detectedMimeType }) => detectedMimeType.includes("image/"))
        .map(async ({ stream, detectedFileExtension }, ind) => {
        await pipeline(stream, fs_1.default.createWriteStream((0, path_1.resolve)(location, `${targetId}_${String(ind + 1).padStart(2, "0")}.original.${detectedFileExtension}`)));
        return (0, path_1.resolve)(location, `${targetId}_${String(ind + 1).padStart(2, "0")}.original.${detectedFileExtension}`);
    }));
}
exports.default = imageSaver;
//# sourceMappingURL=index.js.map