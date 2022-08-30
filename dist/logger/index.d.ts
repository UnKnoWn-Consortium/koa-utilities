/**
 * Koa logger middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 26/6/2020.
 */
import { Middleware } from "koa";
declare function loggerFactory(loggerInstance: any): Middleware;
export default loggerFactory;
