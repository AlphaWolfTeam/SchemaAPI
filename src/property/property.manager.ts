import PropertyRepository from './property.repository';
import IProperty from './property.interface';

export default class PropertyManager{
    static async deleteById(id: string): Promise<IProperty | null> {
        return await PropertyRepository.deleteById(id);
      }

}