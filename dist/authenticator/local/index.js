/**
 * Koa local authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 12/9/2020.
 */
import Paseto from "../../tokenIssuer/paseto.js";
export function localAuthenticatorFactory(PasetoKey, acceptCookie = false, acceptQueryString = false, errorHandler) {
    if (!PasetoKey) {
        throw "paseto key required";
    }
    const tokenIssuer = new Paseto(PasetoKey, () => ({}));
    return async function authenticator(ctx, next) {
        const throwErr = errorHandler || ctx.throw;
        const regex = new RegExp("Bearer (.+)");
        const match = regex.exec(ctx.header?.authorization ?? "");
        if (!match) {
            if (!acceptCookie ||
                !ctx.cookies.get(typeof acceptCookie === "string" ? acceptCookie : "authorization")) {
                if (!acceptQueryString ||
                    !ctx.query[typeof acceptQueryString === "string" ? acceptQueryString : "authorization"]) {
                    await throwErr(401);
                    return;
                }
            }
        }
        ctx.state.token = match?.[1] ??
            ctx.cookies.get(typeof acceptCookie === "string" ? acceptCookie : "authorization") ??
            ctx.query[typeof acceptQueryString === "string" ? acceptQueryString : "authorization"];
        try {
            ctx.state.user = await tokenIssuer.consume(ctx.state.token);
        }
        catch ({ message }) {
            await throwErr(400, message);
            return;
        }
        await next();
    };
}
export default localAuthenticatorFactory;
//# sourceMappingURL=index.js.map