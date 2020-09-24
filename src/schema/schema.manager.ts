import {
  DuplicatePropertyNameError,
  DuplicateSchemaNameError,
  PropertyNameAlreadyExistError,
  PropertyNotInSchemaError,
} from "./../utils/errors/user";
import SchemaRepository from "./schema.repository";
import PropertyManager from "../property/property.manager";
import ISchema from "./schema.interface";
import IProperty from "../property/property.interface";
import {
  InvalidIdError,
  SchemaNotFoundError,
  InvalidValueInSchemaError,
} from "../utils/errors/user";

const MONGO_UNIQUE_NAME_CODE: number = 11000;
export default class SchemaManager {
  static async create(schema: ISchema,schemaProperties: IProperty[]): Promise<ISchema | null> {
    schema.schemaProperties = [];
    if (!this.isAllPropertiesUnique(schemaProperties)) {
      throw new DuplicatePropertyNameError();
    }
    for (let property of schemaProperties) {
      const createdProperty = (await PropertyManager.create(
        property
      )) as IProperty;
      schema.schemaProperties.push(createdProperty as IProperty);
    }
    return SchemaRepository.create(schema).catch((error: Object) => {
      schema.schemaProperties.forEach(property => {
        PropertyManager.deleteById(property._id as string);
      });
      if(error["code"] === MONGO_UNIQUE_NAME_CODE){
        throw new DuplicateSchemaNameError();
      }
      throw new InvalidValueInSchemaError();
      
    });
  }

  static async deleteSchema(id: string): Promise<void> {
    const schema = await SchemaRepository.deleteById(id).catch(() => {
      throw new InvalidIdError();
    });

    if (schema) {
      schema.schemaProperties.forEach(async (property: IProperty) => {
        PropertyManager.deleteById(String(property));
      });
    } else {
      throw new SchemaNotFoundError();
    }
  }

  static async deleteProperty(
    schemaId: string,
    propertyId: string
  ): Promise<void> {
    const schema: ISchema = (await this.getById(schemaId)) as ISchema;
    const propertyIndex = schema.schemaProperties
      .map((property) => String(property))
      .indexOf(propertyId);
    if (propertyIndex > -1) {
      schema.schemaProperties.splice(propertyIndex, 1);
      await PropertyManager.deleteById(propertyId);
    } else {
      throw new PropertyNotInSchemaError();
    }
    SchemaRepository.updateById(schemaId, schema as ISchema);
  }

  static async getById(schemaId: string): Promise<ISchema | null> {
    const schema = await SchemaRepository.getById(schemaId).catch(() => {
      throw new InvalidIdError();
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

    if (!this.isAllPropertiesUnique(newProperties)) {
      throw new PropertyNameAlreadyExistError();
    }
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

  static isAllPropertiesUnique(propertyList: IProperty[]): boolean {
    const nameArray = propertyList.map((property) => property.propertyName);
    return nameArray.every(
      (name) => nameArray.indexOf(name) === nameArray.lastIndexOf(name)
    );
  }
}
