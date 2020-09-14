"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./../utils/errors/user");
const property_repository_1 = __importDefault(require("./property.repository"));
class PropertyManager {
    static async create(property) {
        return property_repository_1.default.create(property).catch((error) => {
            throw error;
        });
    }
    static async getById(id) {
        const property = await property_repository_1.default.getById(id).catch(() => {
            throw new user_1.InvalidId();
        });
        if (property === null) {
            throw new user_1.PropertyNotFoundError();
        }
        return property;
    }
    static async deleteById(id) {
        const property = await property_repository_1.default.deleteById(id).catch(() => {
            throw new user_1.InvalidId();
        });
        if (property === null) {
            throw new user_1.PropertyNotFoundError();
        }
        return property;
    }
}
exports.default = PropertyManager;
//# sourceMappingURL=property.manager.js.map