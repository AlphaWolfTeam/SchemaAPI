import { Router } from "express";
import schemaRouter from "./schema/schema.router";

const appRouter: Router = Router();
appRouter.use("/api/schema", schemaRouter);
// TODO: Add client native
appRouter.use("/", schemaRouter);

export default appRouter;
