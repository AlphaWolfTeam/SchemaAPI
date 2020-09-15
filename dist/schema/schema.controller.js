"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_manager_1 = __importDefault(require("./schema.manager"));
class SchemaController {
    static async create(req, res) {
        try {
            const schema = {
                schemaName: req.body.schemaName,
                schemaProperties: [],
                permissions: req.body.permissions,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt,
            };
            res.json(await schema_manager_1.default.create(schema, req.body.schemaProperties));
            res.end();
        }
        catch (error) {
            res.json(error);
        }
    }
    static async update(req, res) {
        try {
            const updated = await schema_manager_1.default.updateById(req.params.id, req.body);
            if (updated) {
            }
            res.json(updated);
        }
        catch (error) {
            res.json(error);
        }
    }
    static async deleteSchema(req, res) {
        try {
            const deleted = await schema_manager_1.default.deleteSchema(req.params.id);
            if (deleted) {
            }
            res.json(deleted);
        }
        catch (error) {
            res.json(error);
        }
    }
    static async deleteProperty(req, res) {
        try {
            const schema = await schema_manager_1.default.deleteProperty(req.params.id, req.params.propertyId);
            if (schema) {
            }
            res.json(schema);
        }
        catch (error) {
            res.json(error);
        }
    }
    static async getById(req, res) {
        try {
            const schemaId = req.params.id;
            res.json(await schema_manager_1.default.getById(schemaId));
            res.end();
        }
        catch (error) {
            res.json(error);
        }
    }
    static async getAll(_req, res) {
        try {
            res.json(await schema_manager_1.default.getAll());
            res.end();
        }
        catch (error) {
            res.json(error);
        }
    }
}
exports.default = SchemaController;
//# sourceMappingURL=schema.controller.js.map