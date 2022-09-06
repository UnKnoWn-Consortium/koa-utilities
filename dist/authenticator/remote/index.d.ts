/**
 * Koa remote authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 2/10/2020.
 */
import { Middleware, DefaultState } from "koa";
export interface RequestState extends DefaultState {
    user: any;
}
export declare function remoteAuthenticatorFactory(path: string, acceptCookie?: string | boolean, acceptQueryString?: string | boolean, errorHandler?: Function): Middleware<RequestState>;
export default remoteAuthenticatorFactory;
