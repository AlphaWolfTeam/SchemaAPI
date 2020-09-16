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
exports.sendDataToRabbit = exports.initRabbit = void 0;
const menashmq_1 = __importDefault(require("menashmq"));
const index_1 = __importDefault(require("../../config/index"));
const { rabbit } = index_1.default;
exports.initRabbit = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connecting to Rabbit...");
    yield menashmq_1.default.connect(rabbit.uri, rabbit.retryOptions);
    console.log("Rabbit connected");
    yield menashmq_1.default.declareQueue(rabbit.queueName);
    console.log("Rabbit initialized");
});
exports.sendDataToRabbit = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return menashmq_1.default.send(rabbit.queueName, data);
});
//# sourceMappingURL=rabbit.js.map