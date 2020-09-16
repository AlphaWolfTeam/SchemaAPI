import { PropertyNotInSchemaError } from "./../utils/errors/user";
import SchemaRepository from "./schema.repository";
import PropertyManager from "../property/property.manager";
import ISchema from "./schema.interface";
import IProperty from "../property/property.interface";
import {
  InvalidId,
  SchemaNotFoundError,
  InvalidValueInSchema,
} from "../utils/errors/user";

export default class SchemaManager {
  static async create(
    schema: ISchema,
    schemaProperties: IProperty[]
  ): Promise<ISchema | null> {
    schema.schemaProperties = [];
    for (let property of schemaProperties) {
      const createdProperty = (await PropertyManager.create(
        property
      )) as IProperty;
      schema.schemaProperties.push(createdProperty as IProperty);
    }
    return SchemaRepository.create(schema).catch(() => {
      throw new InvalidValueInSchema();
    });
  }

  static async deleteSchema(id: string): Promise<ISchema | null> {
    const schema = await SchemaRepository.deleteById(id).catch(() => {
      throw new InvalidId();
    });

    if (schema) {
      schema.schemaProperties.forEach(async (property: IProperty) => {
        PropertyManager.deleteById(String(property));
      });
    } else {
      throw new SchemaNotFoundError();
    }

    return schema;
  }

  static async deleteProperty(
    schemaId: string,
    propertyId: string
  ): Promise<ISchema | null> {
    let hasPropertyFound = false;
    const schema = await this.getById(schemaId);
    const property = await PropertyManager.getById(propertyId);

    if (schema) {
      schema.schemaProperties = schema.schemaProperties.filter(
        (property: IProperty) => {
          if (String(property) === propertyId) {
            hasPropertyFound = true;
            return false;
          }
          return true;
        }
      );
    } else {
      throw new SchemaNotFoundError();
    }

    if (!hasPropertyFound) {
      throw new PropertyNotInSchemaError();
    }

    if (property) {
      await PropertyManager.deleteById(propertyId);
    }

    return SchemaRepository.updateById(schemaId, schema as ISchema);
  }

  static async getById(schemaId: string): Promise<ISchema | null> {
    const schema = await SchemaRepository.getById(schemaId).catch(() => {
      throw new InvalidId();
    });
    if (schema === null) {
      throw new SchemaNotFoundError();
    }
    return schema;
  }

  static async getAll(): Promise<ISchema[] | null> {
    return await SchemaRepository.getAll();
  }

  static async updateById(
    id: string,
    schema: ISchema
  ): Promise<ISchema | null> {
    const prevSchema: ISchema = (await this.getById(id)) as ISchema;
    const newProperties = [...schema.schemaProperties];
    schema.schemaProperties = [];

    for (let prevProperty of prevSchema.schemaProperties) {
      let newPropertyIndex = newProperties
        .map((newProperty) => newProperty._id)
        .indexOf(String(prevProperty));
      if (newPropertyIndex !== -1) {
        let updatedProperty = (await PropertyManager.updateById(
          String(prevProperty),
          newProperties[newPropertyIndex]
        )) as IProperty;
        schema.schemaProperties.push(updatedProperty);
      } else {
        await PropertyManager.deleteById(String(prevProperty));
      }
    }

    for (let newProperty of newProperties) {
      let prevPropertyIndex = prevSchema.schemaProperties
        .map((prevProperty) => String(prevProperty))
        .indexOf(newProperty._id as string);
      if (prevPropertyIndex === -1) {
        let createdProperty = (await PropertyManager.create(
          newProperty
        )) as IProperty;
        schema.schemaProperties.push(createdProperty);
      }
    }

    return SchemaRepository.updateById(id, schema);
  }
}
