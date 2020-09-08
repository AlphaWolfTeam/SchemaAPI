"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_repository_1 = require("./property.repository");
class PropertyManager {
    static create(property) {
        return property_repository_1.default.create(property);
    }
    static async getById(id) {
        return await property_repository_1.default.getById(id);
    }
    static async deleteById(id) {
        return await property_repository_1.default.deleteById(id);
    }
    static async updateById(id, property) {
        return await property_repository_1.default.updateById(id, property);
    }
}
exports.default = PropertyManager;
//# sourceMappingURL=property.manager.js.map