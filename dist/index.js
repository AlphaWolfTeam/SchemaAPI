"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("./server"));
const index_1 = __importDefault(require("./config/index"));
const { mongo, service } = index_1.default;
const initializeMongo = async () => {
    console.log('Connecting to Mongo...');
    await mongoose_1.default.connect(mongo.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
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