/**
 * Koa user role filter factory
 * Koa Utilities
 * Created by Thomas Sham on 20/9/2020.
 */
import { Middleware } from "koa";
export declare function userPropFilterFactory(path: string | undefined, inValues: any): Middleware;
export default userPropFilterFactory;
