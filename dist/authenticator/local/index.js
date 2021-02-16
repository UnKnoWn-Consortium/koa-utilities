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
function localAuthenticatorFactory(PasetoKey, acceptCookie = false, acceptQueryString = false, errorHandler) {
    if (!PasetoKey) {
        throw "paseto key required";
    }
    const tokenIssuer = new PASETO_1.default(PasetoKey, () => ({}));
    return async function authenticator(ctx, next) {
        var _a, _b;
        const throwErr = errorHandler || ctx.throw;
        const regex = new RegExp("Bearer (.+)");
        const match = regex.exec(ctx.header.authorization);
        if (!match) {
            if (!acceptCookie ||
                !ctx.cookies.get(typeof acceptCookie === "string" ? acceptCookie : "authorization")) {
                if (!acceptQueryString ||
                    !ctx.query[typeof acceptQueryString === "string" ? acceptQueryString : "authorization"]) {
                    await throwErr(401);
                    return;
                }
            }
        }
        ctx.state.token = (_b = (_a = match === null || match === void 0 ? void 0 : match[1]) !== null && _a !== void 0 ? _a : ctx.cookies.get(typeof acceptCookie === "string" ? acceptCookie : "authorization")) !== null && _b !== void 0 ? _b : ctx.query[typeof acceptQueryString === "string" ? acceptQueryString : "authorization"];
        let user;
        try {
            user = await tokenIssuer.consume(ctx.state.token);
        }
        catch ({ message }) {
            await throwErr(400, message);
            return;
        }
        ctx.state.user = user;
        await next();
    };
}
exports.localAuthenticatorFactory = localAuthenticatorFactory;
exports.default = localAuthenticatorFactory;
