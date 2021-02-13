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
function remoteAuthenticatorFactory(path, acceptQueryString = false) {
    if (!path) {
        throw "path for remote authentication required";
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
        let response;
        try {
            response = await got_1.default(path, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${match[1]}`
                },
            });
        }
        catch (e) {
            console.error(e);
            ctx.throw(500);
            throw e;
        }
        if (!(response.statusCode >= 200 && response.statusCode < 300)) {
            console.error(response.body);
            ctx.throw(response.statusCode, response.body);
            throw response.body;
        }
        let user;
        try {
            user = JSON.parse(response.body);
        }
        catch (e) {
            console.error(e);
            ctx.throw(500);
            throw "REMOTE AUTH error";
        }
        ctx.state.user = user;
        await next();
    };
}
exports.remoteAuthenticatorFactory = remoteAuthenticatorFactory;
exports.default = remoteAuthenticatorFactory;
