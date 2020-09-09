"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_repository_1 = require("./schema.repository");
const property_manager_1 = require("../property/property.manager");
class SchemaManager {
    static async createSchema(schema, schemaProperties) {
        for await (let property of schemaProperties) {
            const createdProperty = await property_manager_1.default.create(property);
            schema.schemaProperties.push(createdProperty);
        }
        return schema_repository_1.default.createSchema(schema);
    }
    static async deleteSchema(id) {
        const schema = await schema_repository_1.default.deleteById(id);
        if (schema) {
            schema.schemaProperties.forEach(async (property) => {
                property_manager_1.default.deleteById(String(property));
            });
        }
        return schema;
    }
    static async deleteProperty(schemaId, propertyId) {
        let hasPropertyFound = false;
        const schema = await schema_repository_1.default.getById(schemaId);
        const property = await property_manager_1.default.getById(propertyId);
        if (schema) {
            schema.schemaProperties = schema.schemaProperties.filter((property) => {
                if (String(property) === propertyId) {
                    hasPropertyFound = true;
                    return false;
                }
                return true;
            });
        }
        if (!hasPropertyFound) {
        }
        if (property) {
            await property_manager_1.default.deleteById(propertyId);
        }
        return schema_repository_1.default.updateById(schemaId, schema);
    }
    static async getById(schemaId) {
        const schema = await schema_repository_1.default.getById(schemaId);
        if (schema === null) {
        }
        return schema;
    }
    static async getAll() {
        return await schema_repository_1.default.getAll();
    }
    static async updateById(id, schema) {
        const prevSchema = await schema_repository_1.default.getById(id);
        const newProperties = [...schema.schemaProperties];
        schema.schemaProperties = [];
        for await (let prevProperty of prevSchema.schemaProperties) {
            await property_manager_1.default.deleteById(String(prevProperty));
        }
        for await (let property of newProperties) {
            let createdProperty = await property_manager_1.default.create(property);
            schema.schemaProperties.push(createdProperty);
        }
        return schema_repository_1.default.updateById(id, schema);
    }
}
exports.default = SchemaManager;
//# sourceMappingURL=schema.manager.js.map