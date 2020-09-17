"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./../utils/errors/user");
const property_repository_1 = __importDefault(require("./property.repository"));
class PropertyManager {
    static create(property) {
        return __awaiter(this, void 0, void 0, function* () {
            return property_repository_1.default.create(property).catch((error) => {
                throw error;
            });
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield property_repository_1.default.getById(id).catch(() => {
                throw new user_1.InvalidIdError();
            });
            if (property === null) {
                throw new user_1.PropertyNotFoundError();
            }
            return property;
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield property_repository_1.default.deleteById(id).catch(() => {
                throw new user_1.InvalidIdError();
            });
            if (property === null) {
                throw new user_1.PropertyNotFoundError();
            }
            return property;
        });
    }
    static updateById(id, newProperty) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield property_repository_1.default.updateById(id, newProperty).catch(() => {
                throw new user_1.InvalidIdError();
            });
            if (property === null) {
                throw new user_1.PropertyNotFoundError();
            }
            return property;
        });
    }
}
exports.default = PropertyManager;
//# sourceMappingURL=property.manager.js.map