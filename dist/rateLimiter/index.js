"use strict";
/**
 * Koa rate limiter middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 26/6/2020.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function rateLimiterFactory() {
    return async function rateLimiter(ctx, next) {
        await next();
    };
}
exports.default = rateLimiterFactory;
