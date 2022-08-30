"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASETO = void 0;
const crypto_1 = require("crypto");
const paseto_1 = __importDefault(require("paseto"));
const { "V2": { sign, verify, } } = paseto_1.default;
class PASETO {
    constructor(secretKey, defaults) {
        this.secretKey = (0, crypto_1.createPrivateKey)(secretKey);
        this.defaults = defaults;
    }
    produce(payload) {
        return sign(Object.assign({}, this.defaults(), payload), this.secretKey);
    }
    consume(token) {
        if (!token) {
            throw Error("There is no token to consume");
        }
        return verify(token, (0, crypto_1.createPublicKey)(this.secretKey));
    }
}
exports.PASETO = PASETO;
exports.default = PASETO;
//# sourceMappingURL=PASETO.js.map