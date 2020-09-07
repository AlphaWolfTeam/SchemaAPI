"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wrapper_1 = require("../utils/wrapper");
const controller_1 = require("./controller");
const appRouter = express_1.Router();
appRouter.post('/api/schema', wrapper_1.wrapAsync(controller_1.default.create));
appRouter.put('/api/schema/:id', wrapper_1.wrapAsync(controller_1.default.update));
appRouter.delete('/api/schema/:id', wrapper_1.wrapAsync(controller_1.default.deleteSchema));
appRouter.delete('/api/schema/:id/:propertyId', wrapper_1.wrapAsync(controller_1.default.deleteProperty));
appRouter.get('/api/schema/:id', wrapper_1.wrapAsync(controller_1.default.getById));
appRouter.get('/api/schemas', wrapper_1.wrapAsync(controller_1.default.getAll));
exports.default = appRouter;
//# sourceMappingURL=router.js.map