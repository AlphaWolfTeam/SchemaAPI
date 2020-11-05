import { Request, Response } from "express";
import SchemaManager from "./schema.manager";

export default class SchemaController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const createdSchema = await SchemaManager.create(
        {
          schemaName: req.body.schemaName,
          schemaProperties: [],
        },
        req.body.schemaProperties
      );
      res.json(createdSchema);
    } catch (error) {
      res.json(error);
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const updatedSchema = await SchemaManager.updateById(
        req.params.id,
        req.body
      );
      res.json(updatedSchema);
    } catch (error) {
      res.json(error);
    }
  }

  static async deleteSchema(req: Request, res: Response): Promise<void> {
    try {
      await SchemaManager.deleteSchema(req.params.id);
      res.end();
    } catch (error) {
      res.json(error);
    }
  }

  static async deleteProperty(req: Request, res: Response): Promise<void> {
    try {
      await SchemaManager.deleteProperty(
        req.params.id,
        req.params.propertyId
      );
      res.end();
    } catch (error) {
      res.json(error);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      res.json(await SchemaManager.getById(req.params.id));
    } catch (error) {
      res.json(error);
    }
  }

  static async getAll(_req: Request, res: Response) {
    try {
      res.json(await SchemaManager.getAll());
    } catch (error) {
      res.json(error);
    }
  }
}
