import SchemaModel from './schema.model';
import ISchema from './schema.interface';

export default class SchemaRepository{
    static deleteById(_id: string): Promise<ISchema | null> {
        return SchemaModel.findByIdAndRemove(_id).exec();
      }

}