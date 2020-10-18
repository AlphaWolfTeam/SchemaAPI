"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wrapper_1 = require("../utils/wrapper");
const schema_controller_1 = __importDefault(require("../schema/schema.controller"));
const permissions_1 = require("../utils/permissions/permissions");
const permissions_config_1 = require("../utils/permissions/permissions.config");
const schemaRouter = express_1.Router();
schemaRouter.post("/api/schema", wrapper_1.wrapAsyncPermissions(permissions_1.checkPermission, permissions_config_1.config.create), wrapper_1.wrapAsync(schema_controller_1.default.create));
schemaRouter.put("/api/schema/:id", wrapper_1.wrapAsyncPermissions(permissions_1.checkPermission, permissions_config_1.config.update), wrapper_1.wrapAsync(schema_controller_1.default.update));
schemaRouter.delete("/api/schema/:id", wrapper_1.wrapAsyncPermissions(permissions_1.checkPermission, permissions_config_1.config.deleteSchema), wrapper_1.wrapAsync(schema_controller_1.default.deleteSchema));
schemaRouter.delete("/api/schema/:id/:propertyId", wrapper_1.wrapAsyncPermissions(permissions_1.checkPermission, permissions_config_1.config.deleteProperty), wrapper_1.wrapAsync(schema_controller_1.default.deleteProperty));
schemaRouter.get("/api/schema/:id", wrapper_1.wrapAsyncPermissions(permissions_1.checkPermission, permissions_config_1.config.getById), wrapper_1.wrapAsync(schema_controller_1.default.getById));
schemaRouter.get("/api/schema", wrapper_1.wrapAsyncPermissions(permissions_1.checkPermission, permissions_config_1.config.getAll), wrapper_1.wrapAsync(schema_controller_1.default.getAll));
exports.default = schemaRouter;
//# sourceMappingURL=schema.router.js.map