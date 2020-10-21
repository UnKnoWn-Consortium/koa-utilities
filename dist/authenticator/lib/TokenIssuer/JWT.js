"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    constructor() {
    }
    async produce(payload) {
    }
    async consume(token) {
        if (!token) {
            throw Error("There is no token to consume");
        }
    }
}
exports.JWT = JWT;
exports.default = jsonwebtoken_1.default;
