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

  static async updateById(id: string,newSchema: ISchema): Promise<ISchema | null | void> {
    const prevSchema: ISchema = (await this.getById(id)) as ISchema;
    const newProperties: IProperty[] = [...newSchema.schemaProperties];
    const updatedProperties: IProperty[] = [];
    const createdProperties: IProperty[] = [];
    const deletedProperties: IProperty[] = [];
    newSchema.schemaProperties = [];

    this.checkIfAllPropertiesUnique(newProperties);
    await this.updatePrevProperties(
      prevSchema.schemaProperties,
      newProperties,
      newSchema.schemaProperties,
      updatedProperties,
      deletedProperties
    );
    await this.createNewProperties(
      prevSchema.schemaProperties,
      newProperties,
      newSchema.schemaProperties,
      createdProperties
    );
    await PropertyManager.updatePropertyRef(prevSchema.schemaName, newSchema.schemaName)
    return SchemaRepository.updateById(id, {
      ...newSchema,
      updatedAt: new Date(),
    }
    ).catch(async (error: Object) => {
      await this.revertUpdate(
        createdProperties,
        updatedProperties,
        deletedProperties, 
        prevSchema.schemaName, newSchema.schemaName
      );
      this.handleCreationError(error);
    });
  }

  private static async updatePrevProperties(
    prevSchemaProperties: IProperty[],
    newProperties: IProperty[],
    schemaProperties: IProperty[],
    updatedProperties: IProperty[],
    deletedProperties: IProperty[]
  ): Promise<void> {
    await Promise.all(
      prevSchemaProperties.map(async (prevProperty) => {
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
          schemaProperties.push(
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
    prevSchemaProperties: IProperty[],
    newProperties: IProperty[],
    schemaProperties: IProperty[],
    createdProperties: IProperty[]
  ): Promise<void> {
    await Promise.all(
      newProperties.map(async (newProperty) => {
        let prevPropertyIndex = this.getPropertyIndexInList(
          prevSchemaProperties,
          newProperty._id as string
        );
        if (prevPropertyIndex === -1) {
          let createdProperty = (await PropertyManager.create(
            newProperty
          )) as IProperty;
          schemaProperties.push(createdProperty);
          createdProperties.push(createdProperty);
        }
      })
    );
  }

  private static async revertUpdate(createdProperties: IProperty[], updatedProperties: IProperty[], deletedProperties: IProperty[],
    prevSchemaName: string, newSchemaName: string) {
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
    await PropertyManager.updatePropertyRef(newSchemaName, prevSchemaName)
    
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
