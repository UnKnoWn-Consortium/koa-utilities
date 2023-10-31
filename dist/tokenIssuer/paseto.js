import { createPrivateKey, createPublicKey, } from "crypto";
import paseto from "paseto";
const { "V2": { sign, verify, } } = paseto;
export class Paseto {
    constructor(secretKey, defaults) {
        this.secretKey = createPrivateKey(secretKey);
        this.defaults = defaults;
    }
    produce(payload) {
        return sign(Object.assign({}, this.defaults(), payload), this.secretKey);
    }
    consume(token) {
        if (!token) {
            throw Error("There is no token to consume");
        }
        return verify(token, createPublicKey(this.secretKey));
    }
}
export default Paseto;
//# sourceMappingURL=paseto.js.map