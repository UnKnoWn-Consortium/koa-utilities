/**
 * Raw HTTP/WS remote authenticator middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 2/10/2020.
 */
export declare function remoteWSAuthenticatorFactory(path: string, acceptCookie?: string | boolean, acceptQueryString?: string | boolean, errorHandler?: Function): (request: any) => Promise<any>;
export default remoteWSAuthenticatorFactory;
