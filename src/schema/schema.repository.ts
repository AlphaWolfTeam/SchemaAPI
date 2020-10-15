import SchemaModel from './schema.model';
import ISchema from './schema.interface';

export default class SchemaRepository {
    static create(schema: ISchema): Promise<ISchema> {
        return SchemaModel.create(schema);
    }

    static async getById(_id: string): Promise<ISchema | null> {
        return await SchemaModel.findOne({ _id }).populate('schemaProperties').exec();
    }

    static deleteById(_id: string): Promise<ISchema | null> {
        return SchemaModel.findByIdAndRemove(_id).exec();
    }

    static updateById(_id: string, schema: Partial<ISchema>): Promise<ISchema | null> {
        return SchemaModel.findOneAndUpdate(
            { _id },
            { $set: schema },
            { upsert: true }
        ).exec();
    }

    static async getAll(): Promise<ISchema[] | null> {
        return await SchemaModel.find().populate('schemaProperties').exec();
    }
}