"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schema_router_1 = __importDefault(require("./schema/schema.router"));
const appRouter = express_1.Router();
appRouter.use("/api/schema", schema_router_1.default);
appRouter.use("/", schema_router_1.default);
exports.default = appRouter;
//# sourceMappingURL=router.js.map