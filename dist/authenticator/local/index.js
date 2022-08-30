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
const PASETO_js_1 = __importDefault(require("../../tokenIssuer/PASETO.js"));
function localAuthenticatorFactory(PasetoKey, acceptCookie = false, acceptQueryString = false, errorHandler) {
    if (!PasetoKey) {
        throw "paseto key required";
    }
    const tokenIssuer = new PASETO_js_1.default(PasetoKey, () => ({}));
    return async function authenticator(ctx, next) {
        const throwErr = errorHandler || ctx.throw;
        const regex = new RegExp("Bearer (.+)");
        const match = regex.exec(ctx.header?.authorization ?? "");
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
        ctx.state.token = match?.[1] ??
            ctx.cookies.get(typeof acceptCookie === "string" ? acceptCookie : "authorization") ??
            ctx.query[typeof acceptQueryString === "string" ? acceptQueryString : "authorization"];
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
//# sourceMappingURL=index.js.map