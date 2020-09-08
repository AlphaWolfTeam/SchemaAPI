"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_repository_1 = require("./schema.repository");
const property_manager_1 = require("../property/property.manager");
class SchemaManager {
    static createSchema(schema, schemaProperties) {
        schemaProperties.forEach(async (property) => {
            schema.schemaProperties.push(await property_manager_1.default.create(property));
        });
        return schema_repository_1.default.createSchema(schema);
    }
    static async deleteSchema(id) {
        const schema = await schema_repository_1.default.deleteById(id);
        if (schema) {
            schema.schemaProperties.forEach(async (property) => {
                property_manager_1.default.deleteById(String(property._id));
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
                if (String(property._id) === propertyId) {
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
    static async getById(groupId) {
        const schema = await schema_repository_1.default.getById(groupId);
        if (schema === null) {
        }
        return schema;
    }
    static async getAll() {
        return await schema_repository_1.default.getAll();
    }
    static async updateById(id, schema) {
        const prevSchema = await schema_repository_1.default.getById(id);
        let isExist;
        schema.schemaProperties.forEach(async (property) => {
            isExist = false;
            prevSchema.schemaProperties.forEach(async (prevProperty) => {
                if (property._id === prevProperty._id) {
                    isExist = true;
                }
            });
            if (isExist) {
                property = await property_manager_1.default.updateById(property._id, property);
            }
            else {
                property = await property_manager_1.default.create(property);
            }
        });
        prevSchema.schemaProperties.forEach(async (prevProperty) => {
            isExist = false;
            schema.schemaProperties.forEach(async (property) => {
                if (property._id === prevProperty._id) {
                    isExist = true;
                }
            });
            if (!isExist) {
                await property_manager_1.default.deleteById(prevProperty._id);
            }
        });
        return schema_repository_1.default.updateById(id, schema);
    }
}
exports.default = SchemaManager;
//# sourceMappingURL=schema.manager.js.map