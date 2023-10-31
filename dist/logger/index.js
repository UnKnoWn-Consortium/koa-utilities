/**
 * Koa logger middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 26/6/2020.
 */
function loggerFactory(loggerInstance) {
    return async function loggerWare(ctx, next) {
        await next();
        const { ip, method, url, status, } = ctx;
        const processTime = ctx.response.get("X-Response-Time");
        const userAgent = ctx.request.header["user-agent"] || "";
        loggerInstance.log("info", `${ip} ${method} ${url} ${status} ${userAgent} ${processTime}`, { ip, method, url, status, processTime, userAgent, });
    };
}
export default loggerFactory;
//# sourceMappingURL=index.js.map