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
                PropertyManager.deleteById(property.propertyId);
            });
        }
    
        return schema;
      }
}