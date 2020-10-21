/**
 * Koa local authenticator middleware factory
 * User Service Koa
 * Created by Thomas Sham on 12/9/2020.
 */

import PASETO from "../lib/TokenIssuer/PASETO";

export function localAuthenticatorFactory (
    PasetoKey: string
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
