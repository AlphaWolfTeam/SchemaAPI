"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("./server"));
const index_1 = __importDefault(require("./config/index"));
const rabbit_1 = require("./utils/rabbitmq/rabbit");
const { mongo, service } = index_1.default;
const initializeMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connecting to Mongo...");
    yield mongoose_1.default.connect(mongo.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
    console.log("Mongo connection established");
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield initializeMongo();
    yield rabbit_1.initRabbit();
    const server = new server_1.default(service.port);
    yield server.start();
    console.log(`Server started on port: ${service.port}`);
});
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map