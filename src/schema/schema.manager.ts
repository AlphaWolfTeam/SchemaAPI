import SchemaRepository from './schema.repository';
import PropertyManager from '../property/property.manager';
import ISchema from './schema.interface';
import IProperty from '../property/property.interface';

export default class SchemaManager {

  static createSchema(schema: ISchema, schemaProperties: IProperty[]): Promise<ISchema | null> {
    schemaProperties.forEach(async property => {
      schema.schemaProperties.push(await PropertyManager.create(property) as IProperty);
    });
    return SchemaRepository.createSchema(schema);
  }

  static async deleteSchema(id: string): Promise<ISchema | null> {
    const schema = await SchemaRepository.deleteById(id);

    if (schema) {
      schema.schemaProperties.forEach(async (property: IProperty) => {
        PropertyManager.deleteById(String(property._id));
      });
    }
    return schema;
  }

  static async deleteProperty(schemaId: string, propertyId: string): Promise<ISchema | null> {
    let hasPropertyFound = false;
    const schema = await SchemaRepository.getById(schemaId);
    const property = await PropertyManager.getById(propertyId);

    if (schema) {
      schema.schemaProperties = schema.schemaProperties.filter(
        (property: IProperty) => {
          if (String(property._id) === propertyId) {
            hasPropertyFound = true;
            return false;
          }
          return true;
        },
      );
    }
    if (!hasPropertyFound) {
      // throw new PersonNotFoundError();
    }

    if (property) {
      await PropertyManager.deleteById(propertyId);
    }

    return SchemaRepository.updateById(schemaId, schema as ISchema);
  }

  static async getById(groupId: string): Promise<ISchema | null> {
    const schema = await SchemaRepository.getById(groupId);
    if (schema === null) {
        // throw new SchemaNotFound();
    }
    return schema;
}

static async getAll(){
  return await SchemaRepository.getAll();
}



  static async updateById(id: string, schema: ISchema): Promise<ISchema | null> {
    const prevSchema: ISchema = await SchemaRepository.getById(id) as ISchema;
    let isExist: boolean;

    schema.schemaProperties.forEach(async property => {
      isExist = false;

      prevSchema.schemaProperties.forEach(async prevProperty => {
        if (property._id === prevProperty._id) {
          isExist = true;
        }
      });

      if (isExist) {
        property = await PropertyManager.updateById(property._id, property) as IProperty;
      } else {
        property = await PropertyManager.create(property) as IProperty;
      }
    });

    prevSchema.schemaProperties.forEach(async prevProperty => {
      isExist = false;

      schema.schemaProperties.forEach(async property => {
        if (property._id === prevProperty._id) {
          isExist = true;
        }
      });

      if (!isExist) {
        await PropertyManager.deleteById(prevProperty._id);
      }
    });

    return SchemaRepository.updateById(id, schema);
  }
}