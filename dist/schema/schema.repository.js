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
const schema_model_1 = __importDefault(require("./schema.model"));
const user_1 = require("../utils/errors/user");
class SchemaRepository {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_model_1.default.find().populate("schemaProperties").exec();
        });
    }
    static getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_model_1.default.findOne({ _id })
                .populate("schemaProperties")
                .exec();
        });
    }
    static create(schema) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_model_1.default.create(schema).catch(() => {
                throw new user_1.InvalidValueInSchemaError();
            });
        });
    }
    static updateById(_id, schema) {
        return schema_model_1.default.findOneAndUpdate({ _id }, { $set: schema }, { upsert: true }).exec();
    }
    static deleteById(_id) {
        return schema_model_1.default.findByIdAndRemove(_id).exec();
    }
}
exports.default = SchemaRepository;
//# sourceMappingURL=schema.repository.js.map