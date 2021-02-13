/**
 * Koa fixed authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 22/10/2020.
 */

export function fixedAuthenticatorFactory (
    token: string,
    acceptQueryString: string | boolean = false,
) {
    if (!token) {
        throw "token required";
    }

    return async function authenticator (
        ctx,
        next
    ) {
        const regex = new RegExp("Bearer (.+)");
        const match = regex.exec(ctx.header.authorization);

        if (!match) {
            if (!acceptQueryString) {
                ctx.throw(401);
                return;
            }
            if (!ctx.query[typeof acceptQueryString === "string" ? acceptQueryString : "authorization"]) {
                ctx.throw(401);
                return;
            }
        }
        ctx.state.token = match?.[1] ?? ctx.query[typeof acceptQueryString === "string" ? acceptQueryString : "authorization"];

        if (token !== ctx.state.token) {
            ctx.throw(401);
            return;
        }

        await next();
    }
}

export default fixedAuthenticatorFactory;
