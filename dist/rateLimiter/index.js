/**
 * Koa rate limiter middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 26/6/2020.
 */
function rateLimiterFactory() {
    return async function rateLimiter(ctx, next) {
        await next();
    };
}
export default rateLimiterFactory;
//# sourceMappingURL=index.js.map