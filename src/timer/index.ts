/**
 * Koa timer middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 20/9/2020.
 */

async function timer (
    ctx,
    next
) {
    const start: number = Date.now();
    await next();
    const ms: number = Date.now() - start;
    ctx.set("X-Response-Time", `${ ms }ms`);
}

export default timer;
