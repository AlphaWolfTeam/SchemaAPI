"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wrapper_1 = require("../utils/wrapper");
const schema_controller_1 = require("../schema/schema.controller");
const schemaRouter = express_1.Router();
schemaRouter.post('/api/schema', wrapper_1.wrapAsync(schema_controller_1.default.create));
schemaRouter.put('/api/schema/:id', wrapper_1.wrapAsync(schema_controller_1.default.update));
schemaRouter.delete('/api/schema/:id', wrapper_1.wrapAsync(schema_controller_1.default.deleteSchema));
schemaRouter.delete('/api/schema/:id/:propertyId', wrapper_1.wrapAsync(schema_controller_1.default.deleteProperty));
schemaRouter.get('/api/schema/:id', wrapper_1.wrapAsync(schema_controller_1.default.getById));
schemaRouter.get('/api/schemas', wrapper_1.wrapAsync(schema_controller_1.default.getAll));
exports.default = schemaRouter;
//# sourceMappingURL=schema.router.js.map