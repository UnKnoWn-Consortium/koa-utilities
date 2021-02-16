/**
 * Koa fixed authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 22/10/2020.
 */

export function fixedAuthenticatorFactory (
    token: string,
    acceptCookie: string | boolean = false,
    acceptQueryString: string | boolean = false,
    errorHandler: Function,
) {
    if (!token) {
        throw "token required";
    }

    return async function authenticator (
        ctx,
        next
    ) {
        const throwErr = errorHandler || ctx.throw;
        const regex = new RegExp("Bearer (.+)");
        const match = regex.exec(ctx.header.authorization);

        if (!match) {
            if (
                !acceptCookie ||
                !ctx.cookies.get(typeof acceptCookie === "string" ? acceptCookie : "authorization")
            ) {
                if (
                    !acceptQueryString ||
                    !ctx.query[typeof acceptQueryString === "string" ? acceptQueryString : "authorization"]
                ) {
                    await throwErr(401);
                    return;
                }
            }
        }

        ctx.state.token = match?.[1] ??
            ctx.cookies.get(typeof acceptCookie === "string" ? acceptCookie : "authorization") ??
            ctx.query[typeof acceptQueryString === "string" ? acceptQueryString : "authorization"];

        if (token !== ctx.state.token) {
            await throwErr(401);
            return;
        }

        await next();
    }
}

export default fixedAuthenticatorFactory;
