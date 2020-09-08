"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const server_1 = require("./server");
const index_1 = require("./config/index");
const { mongo, service } = index_1.default;
const initializeMongo = async () => {
    console.log('Connecting to Mongo...');
    await mongoose.connect(mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
    console.log('Mongo connection established');
};
const main = async () => {
    await initializeMongo();
    const server = new server_1.default(service.port);
    await server.start();
    console.log(`Server started on port: ${service.port}`);
};
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map