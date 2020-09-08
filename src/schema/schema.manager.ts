import SchemaRepository from './schema.repository';
import PropertyManager from '../property/property.manager';
import ISchema from './schema.interface';

export default class SchemaManager{

    static createSchema(schema: ISchema): Promise<ISchema> {
        return SchemaRepository.createSchema(schema);
    }

}