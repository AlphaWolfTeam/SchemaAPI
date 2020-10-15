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
const property_repository_1 = __importDefault(require("./property.repository"));
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = __importDefault(require("mongoose"));
const number_validation_1 = require("./validation/number.validation");
const jsonschema_1 = require("jsonschema");
const string_validation_1 = require("./validation/string.validation");
const date_validation_1 = require("./validation/date.validation");
const schema_manager_1 = __importDefault(require("../schema/schema.manager"));
const validator = new jsonschema_1.Validator();
class PropertyManager {
    static create(property) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateProperty(property);
            return property_repository_1.default.create(Object.assign(Object.assign({}, property), { createdAt: new Date(), updatedAt: new Date() })).catch((error) => {
                throw error;
            });
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield property_repository_1.default.getById(id).catch(() => {
                throw new user_1.InvalidIdError();
            });
            if (property === null) {
                throw new user_1.PropertyNotFoundError();
            }
            return property;
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield property_repository_1.default.deleteById(id).catch(() => {
                throw new user_1.InvalidIdError();
            });
            if (property === null) {
                throw new user_1.PropertyNotFoundError();
            }
            return property;
        });
    }
    static updateById(id, newProperty) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateProperty(newProperty);
            const property = yield property_repository_1.default.updateById(id, Object.assign(Object.assign({}, newProperty), { updatedAt: new Date() })).catch(() => {
                throw new user_1.InvalidIdError();
            });
            if (property === null) {
                throw new user_1.PropertyNotFoundError();
            }
            return property;
        });
    }
    static validateProperty(property) {
        return __awaiter(this, void 0, void 0, function* () {
            if (property.validation &&
                !this.isValidationObjValid(property.propertyType, property.validation)) {
                throw new user_1.InvalidValueInPropertyError(property.propertyName);
            }
            if (property.propertyType === "ObjectId") {
                if (!property.propertyRef) {
                    throw new user_1.PropertyRefNotExistError();
                }
                else if (!(yield this.isSchemaExist(property.propertyRef))) {
                    throw new user_1.SchemaNotFoundError();
                }
            }
            else if (property.propertyRef) {
                throw new user_1.PropertyRefExistError();
            }
            if (property)
                if (property.defaultValue !== undefined) {
                    property.defaultValue = yield this.convertValue(property.defaultValue, property.propertyType, property.propertyName);
                    if (property.validation &&
                        !this.isValueValid(property.validation, property.propertyType, property.defaultValue)) {
                        throw new user_1.DefaultValueIsNotValidError(property.propertyName);
                    }
                }
            if (property.enum) {
                property.enum = yield Promise.all(property.enum.map((value) => {
                    return this.convertValue(value, property.propertyType, property.propertyName);
                }));
                if (property.validation) {
                    property.enum.forEach((value) => {
                        if (!this.isValueValid(property.validation, property.propertyType, value)) {
                            throw new user_1.EnumValuesAreNotValidError(property.propertyName);
                        }
                    });
                }
            }
            if (property.defaultValue !== undefined &&
                property.enum &&
                !property.enum.includes(property.defaultValue)) {
                throw new user_1.InvalidValueInPropertyError(property.propertyName);
            }
        });
    }
    static isValidationObjValid(propertyType, validationObj) {
        switch (propertyType) {
            case "Number":
                return validator.validate(validationObj, number_validation_1.numberValidationSchema).valid;
            case "String":
                return validator.validate(validationObj, string_validation_1.stringValidationSchema).valid;
            case "Date":
                return (validator.validate(validationObj, date_validation_1.dateValidationSchema).valid &&
                    date_validation_1.isDateValidationObjValid(validationObj));
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
                    else {
                        return value;
                    }
            }
        });
    }
    static isValueValid(validateObj, propertyType, value) {
        switch (propertyType) {
            case "Number":
                return number_validation_1.isNumberValueValid(value, validateObj);
            case "String":
                return string_validation_1.isStringValueValid(value, validateObj);
            case "Date":
                return date_validation_1.isDateValueValid(value, validateObj);
            default:
                return false;
        }
    }
    static isValidBoolean(value) {
        return String(value) === "false" || String(value) === "true";
    }
    static isSchemaExist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield schema_manager_1.default.getAll()).map((schema) => schema.schemaName).includes(name);
        });
    }
}
exports.default = PropertyManager;
//# sourceMappingURL=property.manager.js.map