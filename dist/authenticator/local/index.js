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
const PASETO_1 = __importDefault(require("../lib/TokenIssuer/PASETO"));
function localAuthenticatorFactory(PasetoKey) {
    if (!PasetoKey) {
        throw "paseto key required";
    }
    const tokenIssuer = new PASETO_1.default(PasetoKey, () => ({}));
    return async function authenticator(ctx, next) {
        if (!ctx.header.authorization) {
            ctx.throw(401);
            return;
        }
        const regex = new RegExp("Bearer (.+)");
        const match = regex.exec(ctx.header.authorization);
        if (!match) {
            ctx.throw(401);
            return;
        }
        ctx.state.token = match[1];
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
