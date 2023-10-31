import { Middleware } from "koa";
import { Options } from "formidable";
export declare function formidableFactory(options?: Options, errorHandler?: Function): Middleware;
export default formidableFactory;
