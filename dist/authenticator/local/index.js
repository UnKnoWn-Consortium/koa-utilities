"use strict";
/**
 * Koa local authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 12/9/2020.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localAuthenticatorFactory = void 0;
const PASETO_1 = __importDefault(require("../../tokenIssuer/PASETO"));
function localAuthenticatorFactory(PasetoKey, acceptQueryString = false) {
    if (!PasetoKey) {
        throw "paseto key required";
    }
    const tokenIssuer = new PASETO_1.default(PasetoKey, () => ({}));
    return async function authenticator(ctx, next) {
        var _a;
        const regex = new RegExp("Bearer (.+)");
        const match = regex.exec(ctx.header.authorization);
        if (!match) {
            if (!acceptQueryString) {
                ctx.throw(401);
                return;
            }
            if (!ctx.query[typeof acceptQueryString === "string" ? acceptQueryString : "authorization"]) {
                ctx.throw(401);
                return;
            }
        }
        ctx.state.token = (_a = match === null || match === void 0 ? void 0 : match[1]) !== null && _a !== void 0 ? _a : ctx.query[typeof acceptQueryString === "string" ? acceptQueryString : "authorization"];
        let user;
        try {
            user = await tokenIssuer.consume(match[1]);
        }
        catch ({ message }) {
            ctx.throw(400, message);
            return;
        }
        ctx.state.user = user;
        await next();
    };
}
exports.localAuthenticatorFactory = localAuthenticatorFactory;
exports.default = localAuthenticatorFactory;
