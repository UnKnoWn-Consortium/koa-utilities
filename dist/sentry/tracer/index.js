"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentryTracerFactory = void 0;
const node_1 = __importDefault(require("@sentry/node"));
const tracing_1 = require("@sentry/tracing");
function sentryTracerFactory(dsn) {
    node_1.default.init({
        dsn,
        "tracesSampleRate": 1.0,
    });
    return async function sentryTracer(ctx, next) {
        var _a;
        const reqMethod = (ctx.method || "").toUpperCase();
        const reqUrl = ctx.url && tracing_1.stripUrlQueryAndFragment(ctx.url);
        const transaction = node_1.default.startTransaction(Object.assign({ "name": `${reqMethod} ${reqUrl}`, "op": "http.server" }, ((_a = tracing_1.extractTraceparentData(ctx.request.get("sentry-trace"))) !== null && _a !== void 0 ? _a : {})));
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
