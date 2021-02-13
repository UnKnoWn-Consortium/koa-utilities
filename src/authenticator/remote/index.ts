/**
 * Koa remote authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 2/10/2020.
 */

import got from "got";

export function remoteAuthenticatorFactory (
    path: string,
    acceptQueryString: string | boolean = false,
) {
    if (!path) {
        throw "path for remote authentication required";
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

        let response;
        try {
            response = await got(
                path,
                {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${ match[1] }`
                    },
                }
            );
        } catch (e) {
            console.error(e);
            ctx.throw(500);
            throw e;
        }

        if (!(response.statusCode >= 200 && response.statusCode < 300)) {
            console.error(response.body);
            ctx.throw(response.statusCode, response.body);
            throw response.body;
        }

        let user;
        try {
            user = JSON.parse(response.body);
        } catch (e) {
            console.error(e);
            ctx.throw(500);
            throw "REMOTE AUTH error";
        }

        ctx.state.user = user;

        await next();
    }
}

export default remoteAuthenticatorFactory;
