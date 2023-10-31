import { KeyObject, createPrivateKey, createPublicKey, } from "crypto";
import paseto from "paseto";
const { "V2": { sign, verify, } } = paseto;

export interface Defaults {
    iss?: string; // Issuer
    sub?: string; // Subject
    aud?: string; // Audience
    exp?: string; // Expiration
    nbf?: string; // Not Before
    iat?: string; // Issued At
    jti?: string; // Token ID
    kid?: string; // Key-ID
}

export class Paseto {
    private secretKey: KeyObject;
    private defaults: () => Defaults;

    constructor (secretKey: string | Buffer, defaults: () => Defaults,) {
        this.secretKey = createPrivateKey(secretKey);
        this.defaults = defaults;
    }

    produce (payload: any) {
        return sign(Object.assign({}, this.defaults(), payload), this.secretKey);
    }

    consume (token: string) {
        if (!token) {
            throw Error("There is no token to consume");
        }
        return verify(token, createPublicKey(this.secretKey));
    }
}

export default Paseto;
