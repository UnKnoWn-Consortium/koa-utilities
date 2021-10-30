/**
 * Raw HTTP/WS remote authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 2/10/2020.
 */

import got from "got";
import cookie from "cookie";

export function remoteWSAuthenticatorFactory (
    path: string,
    acceptCookie: string | boolean = false,
    acceptQueryString: string | boolean = false,
    errorHandler: Function = (e) => { throw e; },
) {
    if (!path) {
        throw "path for remote authentication required";
    }

    return async function authenticator (request) {
        const regex = new RegExp("Bearer (.+)");
        const match = regex.exec(request.headers.authorization || "");

        const parsedUrl = new URL(request.url);
        const query = parsedUrl.searchParams;
        const cookies = cookie.parse(request.headers.cookie || "");

        if (!match) {
            if (
                !acceptCookie ||
                !cookies[typeof acceptCookie === "string" ? acceptCookie : "authorization"]
            ) {
                if (
                    !acceptQueryString ||
                    !query.get(typeof acceptQueryString === "string" ? acceptQueryString : "authorization")
                ) {
                    await errorHandler(401);
                    return;
                }
            }
        }

        const token = match?.[1] ??
            cookies[typeof acceptCookie === "string" ? acceptCookie : "authorization"] ??
            query.get(typeof acceptQueryString === "string" ? acceptQueryString : "authorization");

        let response;
        try {
            response = await got(
                path,
                {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${ token }`
                    },
                }
            );
            return JSON.parse(response.body);
        } catch (e) {
            //console.error(e);
            await errorHandler(e?.response?.statusCode ?? 500, e?.response?.body ?? "");
            return;
        }
    }
}

export default remoteWSAuthenticatorFactory;
