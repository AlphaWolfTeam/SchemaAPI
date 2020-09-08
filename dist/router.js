"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schema_router_1 = require("./schema/schema.router");
const appRouter = express_1.Router();
appRouter.use(schema_router_1.default);
exports.default = appRouter;
//# sourceMappingURL=router.js.map