import PropertyRepository from './property.repository';
import IProperty from './property.interface';

export default class PropertyManager{
    static async getById(id: string): Promise<IProperty | null> {
        return await PropertyRepository.getById(id);
        // .catch(() => {
        //   throw new GroupNotFoundError();
        // });
      }

    static async deleteById(id: string): Promise<IProperty | null> {
        return await PropertyRepository.deleteById(id);
    }

}