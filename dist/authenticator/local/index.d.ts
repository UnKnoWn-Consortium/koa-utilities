/**
 * Koa local authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 12/9/2020.
 */
import { Middleware } from "koa";
export declare function localAuthenticatorFactory(PasetoKey: string, acceptCookie: string | boolean | undefined, acceptQueryString: string | boolean | undefined, errorHandler: Function): Middleware;
export default localAuthenticatorFactory;
