import { Request, Response } from "express";
import SchemaManager from "./schema.manager";
import ISchema from "./schema.interface";
import { sendDataToRabbit } from "../utils/rabbitmq/rabbit";
import IRabbitMessage from "../utils/rabbitmq/rabbitMessage.interface";
import PropertyManager from "../property/property.manager";
import IProperty from "../property/property.interface";

export default class SchemaController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const schema: ISchema = {
        schemaName: req.body.schemaName,
        schemaProperties: [],
      };
      const createdSchema = await SchemaManager.create(
        schema,
        req.body.schemaProperties
      );
      sendDataToRabbit({
        method: "create schema",
        schema: createdSchema,
      } as IRabbitMessage);
      res.json(createdSchema);
    } catch (error) {
      res.json(error);
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const prevSchema = (await SchemaManager.getById(
        req.params.id
      )) as ISchema;
      const updatedSchema = await SchemaManager.updateById(
        prevSchema._id as string,
        req.body
      );
      sendDataToRabbit({
        method: "update schema",
        schema: updatedSchema,
        prevSchemaName: prevSchema.schemaName,
      } as IRabbitMessage);
      res.json(updatedSchema);
    } catch (error) {
      res.json(error);
    }
  }

  static async deleteSchema(req: Request, res: Response): Promise<void> {
    try {
      const schemaToDelete = (await SchemaManager.getById(
        req.params.id
      )) as ISchema;
      await SchemaManager.deleteSchema(schemaToDelete._id as string);
      sendDataToRabbit({
        method: "delete schema",
        schemaName: schemaToDelete.schemaName,
      } as IRabbitMessage);
      res.end();
    } catch (error) {
      res.json(error);
    }
  }

  static async deleteProperty(req: Request, res: Response): Promise<void> {
    try {
      const schema = (await SchemaManager.getById(req.params.id)) as ISchema;
      const property = (await PropertyManager.getById(
        req.params.propertyId
      )) as IProperty;
      await SchemaManager.deleteProperty(
        schema._id as string,
        property._id as string
      );
      sendDataToRabbit({
        method: "delete property",
        schemaName: schema.schemaName,
        propertyName: property.propertyName,
      } as IRabbitMessage);
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
