/**
 * Koa remote authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 2/10/2020.
 */
import { Middleware, DefaultState } from "koa";
interface State extends DefaultState {
    user: any;
}
export declare function remoteAuthenticatorFactory(path: string, acceptCookie: string | boolean | undefined, acceptQueryString: string | boolean | undefined, errorHandler: Function): Middleware<State>;
export default remoteAuthenticatorFactory;
