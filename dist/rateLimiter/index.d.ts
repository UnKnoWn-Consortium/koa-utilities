/**
 * Koa rate limiter middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 26/6/2020.
 */
import { Middleware } from "koa";
declare function rateLimiterFactory(): Middleware;
export default rateLimiterFactory;
