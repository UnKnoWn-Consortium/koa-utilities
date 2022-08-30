import { Middleware, ParameterizedContext, DefaultState, DefaultContext, Next, } from "koa";

import * as Sentry from "@sentry/node";
import { extractTraceparentData, stripUrlQueryAndFragment, } from "@sentry/tracing";

export function sentryTracerFactory (dsn: string): Middleware {
    Sentry.init(
        {
            dsn,
            "tracesSampleRate": 1.0,
        }
    );

    return async function sentryTracer (
        ctx: ParameterizedContext<DefaultState, DefaultContext, any>,
        next: Next
    ) {
        const reqMethod = (ctx.method || "").toUpperCase();
        const reqUrl = ctx.url && stripUrlQueryAndFragment(ctx.url);
        const transaction = Sentry.startTransaction(
            {
                "name": `${reqMethod} ${reqUrl}`,
                "op": "http.server",
                ...(extractTraceparentData(ctx.request.get("sentry-trace")) ?? {}), // connect to trace of upstream app
            }
        );

        ctx.__sentry_transaction = transaction;

        await next();

        // if using koa router, a nicer way to capture transaction using the matched route
        if (ctx._matchedRoute) {
            const mountPath = ctx.mountPath || "";
            transaction.setName(`${reqMethod} ${mountPath}${ctx._matchedRoute}`);
        }

        transaction.setHttpStatus(ctx.status);
        transaction.finish();
    };
}

export default sentryTracerFactory;
