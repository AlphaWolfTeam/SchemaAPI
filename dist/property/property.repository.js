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
const number_validation_1 = require("./validationSchemas/number.validation");
const jsonschema_1 = require("jsonschema");
const string_validation_1 = require("./validationSchemas/string.validation");
const date_validation_1 = require("./validationSchemas/date.validation");
const validator = new jsonschema_1.Validator();
class PropertyRepository {
    static create(property) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdProperty = yield property_model_1.default.create(property).catch(() => {
                throw new user_1.InvalidValueInPropertyError(property.propertyName);
            });
            if (createdProperty.defaultValue) {
                createdProperty.defaultValue = yield this.convertValue(createdProperty.defaultValue, createdProperty.propertyType, createdProperty.propertyName);
            }
            if (createdProperty.enum) {
                createdProperty.enum = yield Promise.all(createdProperty.enum.map((value) => {
                    return this.convertValue(value, createdProperty.propertyType, createdProperty.propertyName);
                }));
            }
            if (createdProperty.defaultValue && createdProperty.enum) {
                if (!createdProperty.enum.includes(createdProperty.defaultValue)) {
                    throw new user_1.InvalidValueInPropertyError(createdProperty.propertyName);
                }
            }
            if (createdProperty.validation &&
                !this.isValidationObjValid(createdProperty.propertyType, createdProperty.validation)) {
                throw new user_1.InvalidValueInPropertyError(createdProperty.propertyName);
            }
            return yield this.updateById(createdProperty._id, createdProperty);
        });
    }
    static isValidationObjValid(propertyType, validationObj) {
        switch (propertyType) {
            case "Number":
                return validator.validate(validationObj, number_validation_1.numberValidationSchema).valid;
            case "String":
                return validator.validate(validationObj, string_validation_1.stringValidationSchema).valid;
            case "Date":
                return validator.validate(validationObj, date_validation_1.dateValidationSchema).valid;
            default:
                return false;
        }
    }
    static convertValue(value, newType, propertyName) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (newType) {
                case "String":
                    return String(value);
                case "Number":
                    if (isNaN(value)) {
                        throw new user_1.InvalidValueInPropertyError(propertyName);
                    }
                    else {
                        return Number(value);
                    }
                case "Boolean":
                    if (this.isValidBoolean(value)) {
                        return Boolean(value);
                    }
                    else {
                        throw new user_1.InvalidValueInPropertyError(propertyName);
                    }
                case "Date":
                    if (moment_1.default(value, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").isValid()) {
                        return value;
                    }
                    else {
                        throw new user_1.InvalidValueInPropertyError(propertyName);
                    }
                case "ObjectId":
                    if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                        throw new user_1.InvalidValueInPropertyError(propertyName);
                    }
                    else if (!(yield this.isSchemaExist(value))) {
                        console.log('function returnnnnnnnnnnnnnnnnn', (yield this.isSchemaExist(value)));
                        throw new user_1.SchemaNotFoundError();
                    }
                    else {
                        return value;
                    }
            }
        });
    }
    static isValidBoolean(value) {
        return String(value) === "false" || String(value) === "true";
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