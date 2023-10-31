import formidable from "formidable";
export function formidableFactory(options, errorHandler) {
    const form = formidable(options ?? {});
    return async (ctx, next) => {
        const throwErr = errorHandler || ctx.throw;
        try {
            const [fields, files] = await form.parse(ctx.req);
            ctx.files = files;
            // @ts-ignore
            ctx.request.files = fields;
            // @ts-ignore
            ctx.request.body = fields;
        }
        catch (e) {
            await throwErr(e);
        }
        await next();
    };
}
export default formidableFactory;
//# sourceMappingURL=index.js.map