"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const property_repository_1 = __importDefault(require("./property.repository"));
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
}
exports.default = PropertyManager;
//# sourceMappingURL=property.manager.js.map