/**
 * Koa refresh reminder middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 20/9/2020.
 */

import { Middleware, DefaultState } from "koa";

export interface RequestState extends DefaultState {
    user: any
}

function refreshReminderFactory (): Middleware<RequestState> {
    return async function refreshReminder (ctx, next): Promise<void> {
        await next();
        const { user, } = ctx.state;
        if (user) {
            const expiry = new Date(user.exp);
            ctx.set("X-Can-Refresh", Math.abs(Date.now() - expiry.getTime()) > 12 * 60 * 60 * 1000 ? "no" : "yes");
        }
    }
}

export default refreshReminderFactory;
