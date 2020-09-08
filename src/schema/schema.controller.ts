import { Request, Response } from 'express';
import SchemaManager from './schema.manager';
import ISchema from './schema.interface';

export default class SchemaController{
    static async create(req: Request, res: Response): Promise<void> {
        const schema: ISchema = {
            schemaId: req.body.schemaId,
            schemaName: req.body.schemaName,
            schemaProperties: req.body.schemaProperties,
            permissions: req.body.permissions,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
        }
        res.json(await SchemaManager.createSchema(schema));
        res.end();
    }

    static async update(req: Request, res: Response ): Promise<void> {
        console.log(res)
        console.log(req)
        // const personId: string = req.params.id;
        // res.json(personId);
        // res.end();
        // next();
    }


    static async deleteSchema(req: Request, res: Response ): Promise<void> {
        console.log(res)
        console.log(req)
        // const personId: string = req.params.id;
        // res.json(personId);
        // res.end();
        // next();
    }

    static async deleteProperty(req: Request, res: Response ): Promise<void> {
        console.log(res)
        console.log(req)
        // const personId: string = req.params.id;
        // res.json(personId);
        // res.end();
        // next();
    }

    static async getById(req: Request, res: Response ): Promise<void> {
        console.log(res)
        console.log(req)
        // const personId: string = req.params.id;
        // res.json(personId);
        // res.end();
        // next();
    }

    static async getAll(req: Request, res: Response ): Promise<void> {
        console.log(res)
        console.log(req)
        // const personId: string = req.params.id;
        // res.json(personId);
        // res.end();
        // next();
    }

}