// TODO: IT IS A WORK-IN-PROGRESS

import JWT from "jsonwebtoken";

export class JWT {
    constructor () {

    }

    async produce (
        payload,
    ) {

    }

    async consume (
        token: string
    ) {
        if (!token) {
            throw Error("There is no token to consume");
        }


    }
}

export default JWT;
