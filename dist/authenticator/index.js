"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remoteAuthenticatorFactory = exports.localAuthenticatorFactory = void 0;
var local_1 = require("./local");
Object.defineProperty(exports, "localAuthenticatorFactory", { enumerable: true, get: function () { return __importDefault(local_1).default; } });
var remote_1 = require("./remote");
Object.defineProperty(exports, "remoteAuthenticatorFactory", { enumerable: true, get: function () { return __importDefault(remote_1).default; } });
