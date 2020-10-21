/**
 * Koa remote authenticator middleware factory
 * User Service Koa
 * Created by Thomas Sham on 2/10/2020.
 */

import got from "got";

export function remoteAuthenticatorFactory (
    path: string
) {
    if (!path) {
        throw "path for remote authentication required";
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
            ctx.throw(500, response.body);
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
