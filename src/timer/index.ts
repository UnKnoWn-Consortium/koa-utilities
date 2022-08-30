/**
 * Koa timer middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 20/9/2020.
 */

import { ParameterizedContext, DefaultState, DefaultContext, Next, } from "koa";

async function timer (
    ctx: ParameterizedContext<DefaultState, DefaultContext, any>,
    next: Next
) {
    const start: number = Date.now();
    await next();
    const ms: number = Date.now() - start;
    ctx.set("X-Response-Time", `${ ms }ms`);
}

export default timer;
