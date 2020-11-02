import { Router } from "express";
import schemaRouter from "./schema/schema.router";
import config from './config/index';
import proxy from "express-http-proxy";

const appRouter: Router = Router();
appRouter.use("/api/schema", schemaRouter);
appRouter.use("/",  proxy(config.client.url));

export default appRouter;
