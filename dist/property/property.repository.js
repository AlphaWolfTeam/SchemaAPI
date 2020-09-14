"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./../utils/errors/user");
const property_model_1 = __importDefault(require("./property.model"));
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = __importDefault(require("mongoose"));
class PropertyRepository {
    static async create(property) {
        const createdProperty = await property_model_1.default.create(property).catch(() => {
            throw new user_1.InvalidValueInProperty();
        });
        if (createdProperty.defaultValue) {
            createdProperty.defaultValue = await this.convertValue(createdProperty.defaultValue, createdProperty.propertyType);
        }
        if (createdProperty.enum) {
            createdProperty.enum = await Promise.all(createdProperty.enum.map((value) => {
                return this.convertValue(value, createdProperty.propertyType);
            }));
        }
        return await this.updateById(createdProperty._id, createdProperty);
    }
    static async convertValue(value, newType) {
        switch (newType) {
            case 'String':
                return new String(value);
            case 'Number':
                if (isNaN(value)) {
                    throw new user_1.InvalidValueInProperty();
                }
                else {
                    return new Number(value);
                }
            case 'Boolean':
                if (this.isValidBoolean(value)) {
                    return new Boolean(value);
                }
                else {
                    throw new user_1.InvalidValueInProperty();
                }
            case 'Date':
                if (moment_1.default(value, "dddd, MMMM Do YYYY, h:mm:ss a", true).isValid()) {
                    return new Date(value);
                }
                else {
                    throw new user_1.InvalidValueInProperty();
                }
            case 'Array':
                if (!Array.isArray(value)) {
                    return new Array(value);
                }
                else {
                    return value;
                }
            case 'ObjectId':
                if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                    throw new user_1.InvalidValueInProperty();
                }
                else if (!(await this.isSchemaExist(value))) {
                    throw new user_1.SchemaNotFoundError();
                }
                else {
                    return value;
                }
        }
    }
    static isValidBoolean(value) {
        return String(value) === 'false' || String(value) === 'true';
    }
    static async isSchemaExist(objectId) {
        const returnedSchema = await PropertyRepository.getById(String(objectId));
        return returnedSchema !== null;
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