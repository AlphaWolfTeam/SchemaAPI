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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
        var schemaProperties_1, schemaProperties_1_1;
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            schema.schemaProperties = [];
            try {
                for (schemaProperties_1 = __asyncValues(schemaProperties); schemaProperties_1_1 = yield schemaProperties_1.next(), !schemaProperties_1_1.done;) {
                    let property = schemaProperties_1_1.value;
                    const createdProperty = yield property_manager_1.default.create(property);
                    schema.schemaProperties.push(createdProperty);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (schemaProperties_1_1 && !schemaProperties_1_1.done && (_a = schemaProperties_1.return)) yield _a.call(schemaProperties_1);
                }
                finally { if (e_1) throw e_1.error; }
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
        var e_2, _a, e_3, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const prevSchema = yield this.getById(id);
            const newProperties = [...schema.schemaProperties];
            schema.schemaProperties = [];
            try {
                for (var _c = __asyncValues(prevSchema.schemaProperties), _d; _d = yield _c.next(), !_d.done;) {
                    let prevProperty = _d.value;
                    let newPropertyIndex = newProperties.map(newProperty => newProperty._id).indexOf(String(prevProperty));
                    if (newPropertyIndex !== -1) {
                        let updatedProperty = yield property_manager_1.default.updateById(String(prevProperty), newProperties[newPropertyIndex]);
                        schema.schemaProperties.push(updatedProperty);
                    }
                    else {
                        yield property_manager_1.default.deleteById(String(prevProperty));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) yield _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            try {
                for (var newProperties_1 = __asyncValues(newProperties), newProperties_1_1; newProperties_1_1 = yield newProperties_1.next(), !newProperties_1_1.done;) {
                    let newProperty = newProperties_1_1.value;
                    let prevPropertyIndex = prevSchema.schemaProperties.map(prevProperty => String(prevProperty)).indexOf(newProperty._id);
                    if (prevPropertyIndex === -1) {
                        let createdProperty = yield property_manager_1.default.create(newProperty);
                        schema.schemaProperties.push(createdProperty);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (newProperties_1_1 && !newProperties_1_1.done && (_b = newProperties_1.return)) yield _b.call(newProperties_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return schema_repository_1.default.updateById(id, schema);
        });
    }
}
exports.default = SchemaManager;
//# sourceMappingURL=schema.manager.js.map