"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const error_1 = require("../utils/error");
const router_1 = require("./router");
class Server {
    constructor(port) {
        this.app = Server.createExpressApp();
        this.port = port;
    }
    static createExpressApp() {
        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(router_1.default);
        app.use(error_1.errorMiddleware);
        return app;
    }
    async start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map