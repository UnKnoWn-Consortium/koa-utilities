import { Middleware, ParameterizedContext, } from "koa";
import formidable, { Options, } from "formidable";

export function formidableFactory (
    options?: Options,
    errorHandler?: Function
): Middleware {
    const form = formidable(options ?? {});
    return async (ctx: ParameterizedContext, next) => {
        const throwErr = errorHandler || ctx.throw;
        try {
            const [fields, files] = await form.parse(ctx.req);
            ctx.files = files;
            // @ts-ignore
            ctx.request.files = fields;
            // @ts-ignore
            ctx.request.body = fields;
        } catch (e) {
            await throwErr(e);
        }
        await next();
    }
}

export default formidableFactory;
