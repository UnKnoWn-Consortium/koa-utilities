import JWT from "jsonwebtoken";
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
export declare class JWT {
    private secretKey;
    private defaults;
    constructor();
    produce(payload: any): Promise<void>;
    consume(token: string): Promise<void>;
}
export default JWT;
