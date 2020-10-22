"use strict";
/**
 * Koa timer middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 20/9/2020.
 */
Object.defineProperty(exports, "__esModule", { value: true });
async function timer(ctx, next) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
}
exports.default = timer;
