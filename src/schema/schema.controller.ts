import { Request, Response } from 'express';
import SchemaManager from './schema.manager';
import ISchema from './schema.interface';

export default class SchemaController {
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const schema: ISchema = {
                schemaName: req.body.schemaName,
                schemaProperties: [],
                permissions: req.body.permissions,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt,
            }
            res.json(await SchemaManager.create(schema, req.body.schemaProperties));
            res.end();
        } catch (e) {
            res.json(e);
        }
    }

    static async update(req: Request, res: Response): Promise<void> {
        try {
            const updated = await SchemaManager.updateById(req.params.id, req.body);
            if (updated) {
            }
            res.json(updated);
        } catch (e) {
            res.json(e);
        }
    }

    static async deleteSchema(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await SchemaManager.deleteSchema(req.params.id);
            if (deleted) {
            }
            res.json(deleted);
        } catch (e) {
            res.json(e);
        }
    }

    static async deleteProperty(req: Request, res: Response): Promise<void> {
        try {
            const schema = await SchemaManager.deleteProperty(
                req.params.id,
                req.params.propertyId
            );
            if (schema) {
            }
            res.json(schema);
        } catch (e) {
            res.json(e);
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const schemaId: string = req.params.id;
            res.json(await SchemaManager.getById(schemaId));
            res.end();
        } catch (e) {
            res.json(e);
        }
    }

    static async getAll(_req: Request, res: Response) {
        try {
            res.json(await SchemaManager.getAll());
            res.end();
        } catch (e) {
            res.json(e);
        }
    }

}