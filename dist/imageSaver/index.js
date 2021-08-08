"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const util_1 = require("util");
const stream_1 = __importDefault(require("stream"));
const pipeline = util_1.promisify(stream_1.default.pipeline);
function imageSaverFactory(files, location = "./data", targetId) {
    return async () => {
        if (!Array.isArray(files) ||
            files.length === 0) {
            return [];
        }
        return Promise.all(files
            .filter(({ detectedMimeType }) => detectedMimeType.includes("image/"))
            .map(({ stream, detectedFileExtension }, ind) => pipeline(stream, fs_1.default.createWriteStream(path_1.resolve(location, `${targetId}_${String(ind + 1).padStart(2, "0")}.original.${detectedFileExtension}`)))));
    };
}
exports.default = imageSaverFactory;
