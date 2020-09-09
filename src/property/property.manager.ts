import PropertyRepository from './property.repository';
import IProperty from './property.interface';

export default class PropertyManager {
    static create(property: IProperty): Promise<IProperty | null> {
        return PropertyRepository.create(property);
    }

    static async getById(id: string): Promise<IProperty | null> {
        return await PropertyRepository.getById(id);
    }

    static async deleteById(id: string): Promise<IProperty | null> {
        return await PropertyRepository.deleteById(id);
    }

    // static async updateById(id: string, property: Partial<IProperty>): Promise<IProperty | null> {
    //     return await PropertyRepository.updateById(id, property);
    // }
}