"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = exports.PASETO = void 0;
var PASETO_1 = require("./PASETO");
Object.defineProperty(exports, "PASETO", { enumerable: true, get: function () { return __importDefault(PASETO_1).default; } });
var JWT_1 = require("./JWT");
Object.defineProperty(exports, "JWT", { enumerable: true, get: function () { return __importDefault(JWT_1).default; } });
