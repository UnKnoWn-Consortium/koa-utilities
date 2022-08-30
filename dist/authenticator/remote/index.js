"use strict";
/**
 * Koa remote authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 2/10/2020.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remoteAuthenticatorFactory = void 0;
const got_1 = __importDefault(require("got"));
function remoteAuthenticatorFactory(path, acceptCookie = false, acceptQueryString = false, errorHandler) {
    if (!path) {
        throw "path for remote authentication required";
    }
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
        let response;
        try {
            response = await (0, got_1.default)(path, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ctx.state.token}`
                },
            });
        }
        catch (e) {
            console.error(e);
            // @ts-ignore
            await throwErr(e.response.statusCode, e.response.body);
            return;
        }
        try {
            ctx.state.user = JSON.parse(response.body);
        }
        catch (e) {
            //console.error(e);
            await throwErr(500);
            return;
        }
        await next();
    };
}
exports.remoteAuthenticatorFactory = remoteAuthenticatorFactory;
exports.default = remoteAuthenticatorFactory;
//# sourceMappingURL=index.js.map