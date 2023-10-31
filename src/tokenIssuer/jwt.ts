// @ts-nocheck

import { KeyObject, createSecretKey, } from "crypto";
import JWT from "jsonwebtoken";

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

export class Jwt {
    private secretKey: KeyObject;
    private defaults: () => Defaults;

    constructor () {

    }

    async produce (payload) {

    }

    async consume (token: string) {
        if (!token) {
            throw Error("There is no token to consume");
        }


    }
}

export default Jwt;
