/**
 * Koa rate limiter middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 26/6/2020.
 */

import { Middleware, } from "koa";

function rateLimiterFactory (): Middleware {
    return async function rateLimiter (ctx, next) {
        await next();
    }
}

export default rateLimiterFactory;
