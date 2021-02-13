"use strict";
/**
 * Koa fixed authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 22/10/2020.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixedAuthenticatorFactory = void 0;
function fixedAuthenticatorFactory(token, acceptQueryString = false) {
    if (!token) {
        throw "token required";
    }
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
        if (token !== ctx.state.token) {
            ctx.throw(401);
            return;
        }
        await next();
    };
}
exports.fixedAuthenticatorFactory = fixedAuthenticatorFactory;
exports.default = fixedAuthenticatorFactory;
