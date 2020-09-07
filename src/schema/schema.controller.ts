import { Request, Response } from 'express';
import SchemaManager from './schema.manager';

export default class SchemaController {
    static async create(req: Request, res: Response): Promise<void> {
        console.log(res)
        console.log(req)
        // const personId: string = req.params.id;
        // res.json(personId);
        // res.end();
        // next();
    }

    static async update(req: Request, res: Response): Promise<void> {
        console.log(res)
        console.log(req)
        // const personId: string = req.params.id;
        // res.json(personId);
        // res.end();
        // next();
    }

    static async deleteSchema(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await SchemaManager.deleteSchema(req.params.id);
            if (deleted) {
                console.log('info', 'DELETE SCHEMA', `@ id=(${deleted.schemaId})`);
            }
            res.json(deleted);
        } catch (e) {
            throw e;
        }
    }

    static async deleteProperty(req: Request, res: Response): Promise<void> {
        console.log(res)
        console.log(req)
        // const personId: string = req.params.id;
        // res.json(personId);
        // res.end();
        // next();
    }

    static async getById(req: Request, res: Response): Promise<void> {
        console.log(res)
        console.log(req)
        // const personId: string = req.params.id;
        // res.json(personId);
        // res.end();
        // next();
    }

    static async getAll(req: Request, res: Response): Promise<void> {
        console.log(res)
        console.log(req)
        // const personId: string = req.params.id;
        // res.json(personId);
        // res.end();
        // next();
    }

}