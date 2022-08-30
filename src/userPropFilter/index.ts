/**
 * Koa user role filter factory
 * Koa Utilities
 * Created by Thomas Sham on 20/9/2020.
 */

import { Middleware, } from "koa";

export function userPropFilterFactory (path = "state.user", inValues: any): Middleware {
    /*if (!inValues){
        throw Error("value has to be a string or an array");
    }*/

    if (!Array.isArray(inValues)) {
        inValues = [inValues];
    }

    return async function userPropFilter (ctx, next): Promise<void> {
        let target = ctx;
        for (let i = 0; i < path.split(".").length; i++) {
            target = target[path.split(".")[i]];
        }

        if (inValues.includes(target)) {
            await next();
            return;
        }

        ctx.throw(401);
    };
}

export default userPropFilterFactory;
