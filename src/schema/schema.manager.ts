import {
  DuplicatePropertyNameError,
  DuplicateSchemaNameError,
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
  static async create(
    schema: ISchema,
    schemaProperties: IProperty[]
  ): Promise<ISchema | null | void> {
    schema.schemaProperties = [];
    this.checkIfAllPropertiesUnique(schemaProperties);
    await this.createSchemaProperties(schemaProperties, schema);

    return SchemaRepository.create({
      ...schema,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).catch(async (error: Object) => {
      await this.revertCreation(schema);
      this.handleCreationError(error);
    });
  }

  private static async revertCreation(schema: ISchema) {
    schema.schemaProperties.forEach((property: IProperty) => {
      PropertyManager.deleteById(property._id as string);
    });
  }

  private static async createSchemaProperties(
    schemaProperties: IProperty[],
    schema: ISchema
  ): Promise<void> {
    for (let property of schemaProperties) {
      schema.schemaProperties.push(
        (await PropertyManager.create(property).catch((error) => {
          schema.schemaProperties.forEach((property: IProperty) => {
            PropertyManager.deleteById(property._id as string);
          });
          throw error;
        })) as IProperty
      );
    }
  }

  static async deleteSchema(id: string): Promise<void> {
    const schema = await SchemaRepository.deleteById(id).catch(() => {
      throw new InvalidIdError();
    });
    if (schema) {
      schema.schemaProperties.forEach((property: IProperty) => {
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
    const propertyIndex = this.getPropertyIndexInList(
      schema.schemaProperties,
      propertyId
    );
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
  ): Promise<ISchema | null | void> {
    const prevSchema: ISchema = (await this.getById(id)) as ISchema;
    const newProperties: IProperty[] = [...schema.schemaProperties];
    const updatedProperties: IProperty[] = [];
    const createdProperties: IProperty[] = [];
    const deletedProperties: IProperty[] = [];
    schema.schemaProperties = [];

    this.checkIfAllPropertiesUnique(newProperties);
    await this.updatePrevProperties(
      prevSchema,
      newProperties,
      schema,
      updatedProperties,
      deletedProperties
    );
    await this.createNewProperties(
      prevSchema,
      newProperties,
      schema,
      createdProperties
    );
    return SchemaRepository.updateById(id, {
      ...schema,
      updatedAt: new Date(),
    }).catch(async (error: Object) => {
      await this.revertUpdate(
        createdProperties,
        updatedProperties,
        deletedProperties
      );
      this.handleCreationError(error);
    });
  }

  private static async updatePrevProperties(
    prevSchema: ISchema,
    newProperties: IProperty[],
    schema: ISchema,
    updatedProperties: IProperty[],
    deletedProperties: IProperty[]
  ): Promise<void> {
    await Promise.all(
      prevSchema.schemaProperties.map(async (prevProperty) => {
        let newPropertyIndex = this.getPropertyIndexInList(
          newProperties,
          String(prevProperty._id)
        );
        if (newPropertyIndex === -1) {
          deletedProperties.push(
            ((await PropertyManager.deleteById(
              prevProperty._id as string
            )) as Object)["_doc"]
          );
        } else {
          updatedProperties.push(
            ((await PropertyManager.getById(
              prevProperty._id as string
            )) as Object)["_doc"]
          );
          schema.schemaProperties.push(
            (await PropertyManager.updateById(
              prevProperty._id as string,
              newProperties[newPropertyIndex]
            )) as IProperty
          );
        }
      })
    );
  }

  private static async createNewProperties(
    prevSchema: ISchema,
    newProperties: IProperty[],
    schema: ISchema,
    createdProperties: IProperty[]
  ): Promise<void> {
    await Promise.all(
      newProperties.map(async (newProperty) => {
        let prevPropertyIndex = this.getPropertyIndexInList(
          prevSchema.schemaProperties,
          newProperty._id as string
        );
        if (prevPropertyIndex === -1) {
          let createdProperty = (await PropertyManager.create(
            newProperty
          )) as IProperty;
          schema.schemaProperties.push(createdProperty);
          createdProperties.push(createdProperty);
        }
      })
    );
  }

  private static async revertUpdate(
    createdProperties: IProperty[],
    updatedProperties: IProperty[],
    deletedProperties: IProperty[]
  ) {
    await Promise.all(
      createdProperties.map(async (createdProperty) => {
        await PropertyManager.deleteById(createdProperty._id as string);
      })
    );
    await Promise.all(
      updatedProperties.map(async (updatedProperty) => {
        await PropertyManager.updateById(
          updatedProperty._id as string,
          updatedProperty
        );
      })
    );
    await Promise.all(
      deletedProperties.map(async (deletedProperty) => {
        await PropertyManager.create(deletedProperty);
      })
    );
  }

  private static checkIfAllPropertiesUnique(propertyList: IProperty[]): void {
    const nameArray = propertyList.map((property) => property.propertyName);
    const isAllPropertiesUnique = nameArray.every(
      (name) => nameArray.indexOf(name) === nameArray.lastIndexOf(name)
    );

    if (!isAllPropertiesUnique) {
      throw new DuplicatePropertyNameError();
    }
  }

  private static handleCreationError(error: Object): void {
    if (error["code"] === MONGO_UNIQUE_NAME_CODE) {
      throw new DuplicateSchemaNameError();
    } else {
      throw new InvalidValueInSchemaError();
    }
  }

  private static getPropertyIndexInList(
    propertiesList: IProperty[],
    propertyIdToFind: string
  ): number {
    return propertiesList
      .map((property) => property._id as string)
      .indexOf(propertyIdToFind);
  }
}
