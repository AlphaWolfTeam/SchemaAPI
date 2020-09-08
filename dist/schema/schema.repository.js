"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_model_1 = require("./schema.model");
class SchemaRepository {
    static createSchema(schema) {
        return schema_model_1.default.create(schema);
    }
    static getById(_id) {
        return schema_model_1.default.findById(_id).exec();
    }
    static deleteById(_id) {
        return schema_model_1.default.findByIdAndRemove(_id).exec();
    }
    static updateById(_id, schema) {
        return schema_model_1.default.findOneAndUpdate({ _id }, { $set: schema }, { upsert: true }).exec();
    }
    static getAll() {
        return schema_model_1.default.find().exec();
    }
}
exports.default = SchemaRepository;
//# sourceMappingURL=schema.repository.js.map