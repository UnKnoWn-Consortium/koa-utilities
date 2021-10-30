"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentryTracerFactory = void 0;
const Sentry = __importStar(require("@sentry/node"));
const tracing_1 = require("@sentry/tracing");
function sentryTracerFactory(dsn) {
    Sentry.init({
        dsn,
        "tracesSampleRate": 1.0,
    });
    return async function sentryTracer(ctx, next) {
        const reqMethod = (ctx.method || "").toUpperCase();
        const reqUrl = ctx.url && (0, tracing_1.stripUrlQueryAndFragment)(ctx.url);
        const transaction = Sentry.startTransaction({
            "name": `${reqMethod} ${reqUrl}`,
            "op": "http.server",
            ...((0, tracing_1.extractTraceparentData)(ctx.request.get("sentry-trace")) ?? {}), // connect to trace of upstream app
        });
        ctx.__sentry_transaction = transaction;
        await next();
        // if using koa router, a nicer way to capture transaction using the matched route
        if (ctx._matchedRoute) {
            const mountPath = ctx.mountPath || "";
            transaction.setName(`${reqMethod} ${mountPath}${ctx._matchedRoute}`);
        }
        transaction.setHttpStatus(ctx.status);
        transaction.finish();
    };
}
exports.sentryTracerFactory = sentryTracerFactory;
exports.default = sentryTracerFactory;
