import SchemaModel from './schema.model';
import ISchema from './schema.interface';
export default class SchemaRepository{
    static createSchema(schema: ISchema): Promise<ISchema> {
        return SchemaModel.create(schema);
    }


}