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
const user_1 = require("./../utils/errors/user");
const property_model_1 = __importDefault(require("./property.model"));
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = __importDefault(require("mongoose"));
class PropertyRepository {
    static create(property) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdProperty = yield property_model_1.default.create(property).catch(() => {
                throw new user_1.InvalidValueInProperty();
            });
            if (createdProperty.defaultValue) {
                createdProperty.defaultValue = yield this.convertValue(createdProperty.defaultValue, createdProperty.propertyType);
            }
            if (createdProperty.enum) {
                createdProperty.enum = yield Promise.all(createdProperty.enum.map((value) => {
                    return this.convertValue(value, createdProperty.propertyType);
                }));
            }
            if (createdProperty.defaultValue && createdProperty.enum) {
                if (!createdProperty.enum.includes(createdProperty.defaultValue)) {
                    throw new user_1.InvalidValueInProperty();
                }
            }
            return yield this.updateById(createdProperty._id, createdProperty);
        });
    }
    static convertValue(value, newType) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (newType) {
                case 'String':
                    return String(value);
                case 'Number':
                    if (isNaN(value)) {
                        throw new user_1.InvalidValueInProperty();
                    }
                    else {
                        return Number(value);
                    }
                case 'Boolean':
                    if (this.isValidBoolean(value)) {
                        return Boolean(value);
                    }
                    else {
                        throw new user_1.InvalidValueInProperty();
                    }
                case 'Date':
                    if (moment_1.default(value, "dddd, MMMM Do YYYY, h:mm:ss a", true).isValid()) {
                        return Date.parse(value);
                    }
                    else {
                        throw new user_1.InvalidValueInProperty();
                    }
                case 'Array':
                    if (!Array.isArray(value)) {
                        return Array(value);
                    }
                    else {
                        return value;
                    }
                case 'ObjectId':
                    if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                        throw new user_1.InvalidValueInProperty();
                    }
                    else if (!(yield this.isSchemaExist(value))) {
                        throw new user_1.SchemaNotFoundError();
                    }
                    else {
                        return value;
                    }
            }
        });
    }
    static isValidBoolean(value) {
        return String(value) === 'false' || String(value) === 'true';
    }
    static isSchemaExist(objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const returnedSchema = yield PropertyRepository.getById(String(objectId));
            return returnedSchema !== null;
        });
    }
    static getById(_id) {
        return property_model_1.default.findById(_id).exec();
    }
    static deleteById(_id) {
        return property_model_1.default.findByIdAndRemove(_id).exec();
    }
    static updateById(_id, property) {
        return property_model_1.default.findOneAndUpdate({ _id }, { $set: property }, { upsert: true }).exec();
    }
}
exports.default = PropertyRepository;
//# sourceMappingURL=property.repository.js.map