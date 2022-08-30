"use strict";
/**
 * Koa refresh reminder middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 20/9/2020.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function refreshReminderFactory() {
    return async function refreshReminder(ctx, next) {
        await next();
        const { user, } = ctx.state;
        if (user) {
            const expiry = new Date(user.exp);
            ctx.set("X-Can-Refresh", Math.abs(Date.now() - expiry.getTime()) > 12 * 60 * 60 * 1000 ? "no" : "yes");
        }
    };
}
exports.default = refreshReminderFactory;
//# sourceMappingURL=index.js.map