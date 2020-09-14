"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const property_model_1 = __importDefault(require("./property.model"));
const user_1 = require("../utils/errors/user");
const moment_1 = __importDefault(require("moment"));
class PropertyRepository {
    static async create(property) {
        const createdProperty = await property_model_1.default.create(property);
        if (createdProperty.defaultValue) {
            createdProperty.defaultValue = this.convertValue(createdProperty.defaultValue, createdProperty.propertyType);
        }
        if (createdProperty.enum) {
            createdProperty.enum = createdProperty.enum.map(async (value) => {
                return this.convertValue(value, createdProperty.propertyType);
            });
        }
        return await this.updateById(createdProperty._id, createdProperty);
    }
    static convertValue(value, newType) {
        switch (newType) {
            case 'String':
                return new String(value);
            case 'Number':
                console.log('value:', value, 'is valid value:', !isNaN(value));
                if (isNaN(value)) {
                    console.log('throw an error');
                    throw new user_1.InvalidValue();
                }
                else {
                    console.log(Number(value));
                    return Number(value);
                }
            case 'Boolean':
                console.log('value:', value, 'is valid value:', this.isValidBoolean(value));
                if (this.isValidBoolean(value)) {
                    console.log('returned value');
                    return new Boolean(value);
                }
                else {
                    console.log('throw an error');
                    throw new user_1.InvalidValue();
                }
            case 'Date':
                console.log('value:', value, 'is valid value:', (moment_1.default(value, "dddd, MMMM Do YYYY, h:mm:ss a", true).isValid()));
                if (moment_1.default(value, "dddd, MMMM Do YYYY, h:mm:ss a", true).isValid()) {
                    console.log('returned value');
                    return new Date(value);
                }
                else {
                    console.log('throw an error');
                    throw new user_1.InvalidValue();
                }
            case 'Array':
                if (!Array.isArray(value)) {
                    return new Array(value);
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