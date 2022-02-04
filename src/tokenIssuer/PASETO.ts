import { KeyObject, createSecretKey, } from "crypto";
import paseto from "paseto";
const {
    "V2": {
        encrypt,
        decrypt,
    }
} = paseto;

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

export class PASETO {
    private secretKey: KeyObject;
    private defaults: () => Defaults;

    constructor (
        secretKey: string,
        defaults: () => Defaults,
    ) {
        const key = Buffer.from(secretKey, "hex");
        this.secretKey = createSecretKey(key);
        this.defaults = defaults;
    }

    async produce (payload) {
        return await encrypt(
            Object.assign(
                {},
                this.defaults(),
                payload,
            ),
            this.secretKey,
        );
    }

    async consume (token: string) {
        if (!token) {
            throw Error("There is no token to consume");
        }
        return await decrypt(
            token,
            this.secretKey
        );
    }
}

export default PASETO;
