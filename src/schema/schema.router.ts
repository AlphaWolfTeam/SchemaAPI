import { Router } from 'express';
import { wrapAsync } from '../utils/wrapper';
import Controller from '../schema/schema.controller';

const schemaRouter: Router = Router();
schemaRouter.post('/api/schema',  wrapAsync(Controller.create));
schemaRouter.put('/api/schema/:id',wrapAsync(Controller.update),);
schemaRouter.delete('/api/schema/:id', wrapAsync(Controller.deleteSchema));
schemaRouter.delete('/api/schema/:id/:propertyId', wrapAsync(Controller.deleteProperty));
schemaRouter.get('/api/schema/:id', wrapAsync(Controller.getById));
schemaRouter.get('/api/schemas', wrapAsync(Controller.getAll));


export default schemaRouter;
