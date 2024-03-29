/// <reference types="node" resolution-mode="require"/>
export interface Defaults {
    iss?: string;
    sub?: string;
    aud?: string;
    exp?: string;
    nbf?: string;
    iat?: string;
    jti?: string;
    kid?: string;
}
export declare class Paseto {
    private secretKey;
    private defaults;
    constructor(secretKey: string | Buffer, defaults: () => Defaults);
    produce(payload: any): Promise<string>;
    consume(token: string): Promise<object>;
}
export default Paseto;
