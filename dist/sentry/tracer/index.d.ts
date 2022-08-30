import { Middleware } from "koa";
export declare function sentryTracerFactory(dsn: string): Middleware;
export default sentryTracerFactory;
