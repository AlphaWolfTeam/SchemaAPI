import SchemaModel from './schema.model';
import ISchema from './schema.interface';

export default class SchemaRepository{
  static createSchema(schema: ISchema): Promise<ISchema | null> {
        return SchemaModel.create(schema);
    }

    static getById(_id: string): Promise<ISchema | null> {
        return SchemaModel.findById(_id).exec();
    }

    static deleteById(_id: string): Promise<ISchema | null> {
        return SchemaModel.findByIdAndRemove(_id).exec();
    }

    static updateById(_id: string, schema: Partial<ISchema>): Promise<ISchema | null> {
        return SchemaModel.findOneAndUpdate({ _id }, { $set: schema }, { upsert: true }).exec();
    }
}