/**
 * Koa local authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 12/9/2020.
 */

import PASETO from "../../tokenIssuer/PASETO";

export function localAuthenticatorFactory (
    PasetoKey: string,
    acceptQueryString: string | boolean = false,
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

        let user;
        try {
            user = await tokenIssuer.consume(match[1]);
        } catch ({ message }) {
            ctx.throw(400, message);
            return;
        }

        ctx.state.user = user;

        await next();
    }
}

export default localAuthenticatorFactory;
