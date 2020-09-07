import SchemaRepository from './schema.repository';
import PropertyManager from '../property/property.manager';
import ISchema from './schema.interface';
import IProperty from '../property/property.interface';

export default class SchemaManager{

    static async deleteSchema(id: string): Promise<ISchema | null> {
        //  const schema = await SchemaRepository.deleteById(id).catch(() => {
        //    throw new SchemaNotFoundError();
        //  });
        const schema = await SchemaRepository.deleteById(id);

        if (schema) {
            schema.schemaProperties.forEach(async (property: IProperty) => {
                PropertyManager.deleteById(String(property.propertyId));
            });
        }
    
        return schema;
      }

      static async deleteProperty(schemaId: string, propertyId: string): Promise<ISchema | null> {
        let hasPropertyFound = false;
        const schema = await SchemaRepository.getById(schemaId);
        // .catch(() => {
        //   throw new GroupNotFoundError();
        // });
        const property = await PropertyManager.getById(propertyId);
        // .catch(() => {
        //   throw new PersonNotFoundError();
        // });
    
        if (schema) {
            schema.schemaProperties = schema.schemaProperties.filter(
            (property: IProperty) => {
              if (String(property.propertyId) === propertyId) {
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

      static async updateById(id: string, schema: Partial<ISchema>): Promise<ISchema | null> {
        return SchemaRepository.updateById(id, schema)
        // .catch(() => {
        //   throw new PersonNotFoundError();
        // });
      }
}