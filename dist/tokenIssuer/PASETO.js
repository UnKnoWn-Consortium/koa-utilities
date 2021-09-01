"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASETO = void 0;
const crypto_1 = require("crypto");
const paseto_1 = __importDefault(require("paseto"));
const { "V2": { encrypt, decrypt, } } = paseto_1.default;
class PASETO {
    constructor(secretKey, defaults) {
        const key = Buffer.from(secretKey, "hex");
        this.secretKey = (0, crypto_1.createSecretKey)(key);
        this.defaults = defaults;
    }
    async produce(payload) {
        return await encrypt(Object.assign({}, this.defaults(), payload), this.secretKey);
    }
    async consume(token) {
        if (!token) {
            throw Error("There is no token to consume");
        }
        return await decrypt(token, this.secretKey);
    }
}
exports.PASETO = PASETO;
exports.default = PASETO;
