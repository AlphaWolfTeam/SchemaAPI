"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_model_1 = require("./property.model");
class PropertyRepository {
    static async create(property) {
        const createdProperty = await property_model_1.default.create(property);
        if (createdProperty.defaultValue) {
            createdProperty.defaultValue = this.convertValue(createdProperty.defaultValue, createdProperty.propertyType);
        }
        if (createdProperty.enum) {
            createdProperty.enum = createdProperty.enum.map(value => {
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
                return new Number(value);
            case 'Boolean':
                return new Boolean(value);
            case 'Date':
                return new Date(value);
            case 'Array':
                return new Array(value);
        }
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