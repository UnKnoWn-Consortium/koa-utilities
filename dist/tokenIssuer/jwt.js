// @ts-nocheck
export class Jwt {
    constructor() {
    }
    async produce(payload) {
    }
    async consume(token) {
        if (!token) {
            throw Error("There is no token to consume");
        }
    }
}
export default Jwt;
//# sourceMappingURL=jwt.js.map