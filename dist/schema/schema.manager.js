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
const schema_repository_1 = __importDefault(require("./schema.repository"));
const property_manager_1 = __importDefault(require("../property/property.manager"));
const user_2 = require("../utils/errors/user");
class SchemaManager {
    static create(schema, schemaProperties) {
        return __awaiter(this, void 0, void 0, function* () {
            schema.schemaProperties = [];
            for (let property of schemaProperties) {
                const createdProperty = (yield property_manager_1.default.create(property));
                schema.schemaProperties.push(createdProperty);
            }
            return schema_repository_1.default.create(schema).catch(() => {
                throw new user_2.InvalidValueInSchema();
            });
        });
    }
    static deleteSchema(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = yield schema_repository_1.default.deleteById(id).catch(() => {
                throw new user_2.InvalidId();
            });
            if (schema) {
                schema.schemaProperties.forEach((property) => __awaiter(this, void 0, void 0, function* () {
                    property_manager_1.default.deleteById(String(property));
                }));
            }
            else {
                throw new user_2.SchemaNotFoundError();
            }
            return schema;
        });
    }
    static deleteProperty(schemaId, propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            let hasPropertyFound = false;
            const schema = yield this.getById(schemaId);
            const property = yield property_manager_1.default.getById(propertyId);
            if (schema) {
                schema.schemaProperties = schema.schemaProperties.filter((property) => {
                    if (String(property) === propertyId) {
                        hasPropertyFound = true;
                        return false;
                    }
                    return true;
                });
            }
            else {
                throw new user_2.SchemaNotFoundError();
            }
            if (!hasPropertyFound) {
                throw new user_1.PropertyNotInSchemaError();
            }
            if (property) {
                yield property_manager_1.default.deleteById(propertyId);
            }
            return schema_repository_1.default.updateById(schemaId, schema);
        });
    }
    static getById(schemaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = yield schema_repository_1.default.getById(schemaId).catch(() => {
                throw new user_2.InvalidId();
            });
            if (schema === null) {
                throw new user_2.SchemaNotFoundError();
            }
            return schema;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_repository_1.default.getAll();
        });
    }
    static updateById(id, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            const prevSchema = (yield this.getById(id));
            const newProperties = [...schema.schemaProperties];
            schema.schemaProperties = [];
            for (let prevProperty of prevSchema.schemaProperties) {
                let newPropertyIndex = newProperties
                    .map((newProperty) => newProperty._id)
                    .indexOf(String(prevProperty));
                if (newPropertyIndex !== -1) {
                    let updatedProperty = (yield property_manager_1.default.updateById(String(prevProperty), newProperties[newPropertyIndex]));
                    schema.schemaProperties.push(updatedProperty);
                }
                else {
                    yield property_manager_1.default.deleteById(String(prevProperty));
                }
            }
            for (let newProperty of newProperties) {
                let prevPropertyIndex = prevSchema.schemaProperties
                    .map((prevProperty) => String(prevProperty))
                    .indexOf(newProperty._id);
                if (prevPropertyIndex === -1) {
                    let createdProperty = (yield property_manager_1.default.create(newProperty));
                    schema.schemaProperties.push(createdProperty);
                }
            }
            return schema_repository_1.default.updateById(id, schema);
        });
    }
}
exports.default = SchemaManager;
//# sourceMappingURL=schema.manager.js.map