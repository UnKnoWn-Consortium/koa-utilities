/**
 * Koa local authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 12/9/2020.
 */

import PASETO from "../../tokenIssuer/PASETO";

export function localAuthenticatorFactory (
    PasetoKey: string,
    acceptCookie: string | boolean = false,
    acceptQueryString: string | boolean = false,
    errorHandler: Function,
) {
    if (!PasetoKey) {
        throw "paseto key required";
    }

    const tokenIssuer = new PASETO(
        PasetoKey,
        () => ({})
    );

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

        let user;
        try {
            user = await tokenIssuer.consume(ctx.state.token);
        } catch ({ message }) {
            await throwErr(400, message);
            return;
        }

        ctx.state.user = user;

        await next();
    }
}

export default localAuthenticatorFactory;
