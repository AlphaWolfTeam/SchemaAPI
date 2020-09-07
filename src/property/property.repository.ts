import PropertyModel from './property.model';
import IProperty from './property.interface';

export default class PropertyRepository{
    static deleteById(_id: string): Promise<IProperty | null> {
        return PropertyModel.findByIdAndRemove(_id).exec();
      }

}