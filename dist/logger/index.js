"use strict";
/**
 * Koa logger middleware
 * Prerender Service
 * Created by Thomas Sham on 26/6/2020.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Winston_1 = __importDefault(require("./lib/Winston"));
function loggerFactory(ServiceName) {
    const loggerInstance = Winston_1.default(ServiceName);
    return async function loggerWare(ctx, next) {
        await next();
        const { ip, method, url, } = ctx;
        const processTime = ctx.response.get("X-Response-Time");
        const userAgent = ctx.request.header["user-agent"];
        loggerInstance.log("info", `${ip} ${method} ${url} ${userAgent} ${processTime}`, {
            ip,
            method,
            url,
            processTime,
            userAgent,
        });
    };
}
exports.default = loggerFactory;
