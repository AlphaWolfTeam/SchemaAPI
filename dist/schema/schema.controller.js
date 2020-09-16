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
                res.json(yield schema_manager_1.default.create(schema, req.body.schemaProperties));
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield schema_manager_1.default.updateById(req.params.id, req.body);
                if (updated) {
                }
                res.json(updated);
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
                if (deleted) {
                }
                res.json(deleted);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    static deleteProperty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = yield schema_manager_1.default.deleteProperty(req.params.id, req.params.propertyId);
                if (schema) {
                }
                res.json(schema);
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