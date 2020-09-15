import { Router } from 'express';
import schemaRouter from './schema/schema.router';

const appRouter: Router = Router();
appRouter.use(schemaRouter)

export default appRouter;
