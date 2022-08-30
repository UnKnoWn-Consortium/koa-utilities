/**
 * Koa fixed authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 22/10/2020.
 */
import { Middleware } from "koa";
export declare function fixedAuthenticatorFactory(token: string, acceptCookie: string | boolean | undefined, acceptQueryString: string | boolean | undefined, errorHandler: Function): Middleware;
export default fixedAuthenticatorFactory;
