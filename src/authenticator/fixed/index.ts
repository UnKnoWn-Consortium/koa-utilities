/**
 * Koa fixed authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 22/10/2020.
 */

export function fixedAuthenticatorFactory (
    token: string
) {
    if (!token) {
        throw "token required";
    }

    return async function authenticator (
        ctx,
        next
    ) {
        if (!ctx.header.authorization) {
            ctx.throw(401);
            return;
        }
        const regex = new RegExp("Bearer (.+)");
        const match = regex.exec(ctx.header.authorization);

        if (!match) {
            ctx.throw(401);
            return;
        }

        ctx.state.token = match[1];

        if (token !== match[1]) {
            ctx.throw(401);
            return;
        }

        await next();
    }
}

export default fixedAuthenticatorFactory;
