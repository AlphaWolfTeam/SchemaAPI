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
const schema_manager_1 = __importDefault(require("./schema.manager"));
const rabbit_1 = require("../utils/rabbitmq/rabbit");
const property_manager_1 = __importDefault(require("../property/property.manager"));
class SchemaController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = {
                    schemaName: req.body.schemaName,
                    schemaProperties: [],
                    permissions: req.body.permissions,
                    createdAt: req.body.createdAt,
                    updatedAt: req.body.updatedAt,
                };
                const createdSchema = yield schema_manager_1.default.create(schema, req.body.schemaProperties);
                rabbit_1.sendDataToRabbit({ method: 'create schema', schema: createdSchema });
                res.json(createdSchema);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prevSchema = yield schema_manager_1.default.getById(req.params.id);
                const updatedSchema = yield schema_manager_1.default.updateById(req.params.id, req.body);
                rabbit_1.sendDataToRabbit({ method: 'update schema', schema: updatedSchema, prevSchemaName: prevSchema.schemaName });
                res.json(updatedSchema);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    static deleteSchema(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield schema_manager_1.default.deleteSchema(req.params.id);
                rabbit_1.sendDataToRabbit({ method: 'delete schema', schemaName: deleted.schemaName });
                res.end();
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    static deleteProperty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const property = yield property_manager_1.default.getById(req.params.propertyId);
                const schema = yield schema_manager_1.default.deleteProperty(req.params.id, req.params.propertyId);
                rabbit_1.sendDataToRabbit({ method: 'delete property', schemaName: schema.schemaName, propertyName: property.propertyName });
                res.end();
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schemaId = req.params.id;
                res.json(yield schema_manager_1.default.getById(schemaId));
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield schema_manager_1.default.getAll());
            }
            catch (error) {
                res.json(error);
            }
        });
    }
}
exports.default = SchemaController;
//# sourceMappingURL=schema.controller.js.map