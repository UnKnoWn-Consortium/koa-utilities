/**
 * Koa remote authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 2/10/2020.
 */

import got from "got";

export function remoteAuthenticatorFactory (
    path: string,
    acceptCookie: string | boolean = false,
    acceptQueryString: string | boolean = false,
    errorHandler: Function,
) {
    if (!path) {
        throw "path for remote authentication required";
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

        let response;
        try {
            response = await got(
                path,
                {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${ ctx.state.token }`
                    },
                }
            );
        } catch (e) {
            console.error(e);
            await throwErr(500);
            return;
        }

        if (!(response.statusCode >= 200 && response.statusCode < 300)) {
            console.error(response.body);
            await throwErr(response.statusCode, response.body);
            return;
        }

        let user;
        try {
            user = JSON.parse(response.body);
        } catch (e) {
            console.error(e);
            await throwErr(500);
            return;
        }

        ctx.state.user = user;

        await next();
    }
}

export default remoteAuthenticatorFactory;
