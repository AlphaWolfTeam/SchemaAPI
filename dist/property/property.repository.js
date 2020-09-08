"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_model_1 = require("./property.model");
class PropertyRepository {
    static create(property) {
        return property_model_1.default.create(property);
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