import { PropertyNotFoundError, InvalidId } from './../utils/errors/user';
import PropertyRepository from './property.repository';
import IProperty from './property.interface';

export default class PropertyManager {
    static async create(property: IProperty): Promise<IProperty | null> {
        return PropertyRepository.create(property).catch((error) => {
            throw error;
        });
    }

    static async getById(id: string): Promise<IProperty | null> {
        const property = await PropertyRepository.getById(id).catch(() => {
            throw new InvalidId();
        });
        if (property === null) {
            throw new PropertyNotFoundError();
        }
        return property;
    }

    static async deleteById(id: string): Promise<IProperty | null> {
        const property = await PropertyRepository.deleteById(id).catch(() => {
            throw new InvalidId();
        });
        if (property === null) {
            throw new PropertyNotFoundError();
        }
        return property;
    }

    static async updateById(id: string, newProperty: IProperty): Promise<IProperty | null> {
        const property = await PropertyRepository.updateById(id, newProperty).catch(() => {
            throw new InvalidId();
        });
        if (property === null) {
            throw new PropertyNotFoundError();
        }
        return property;
    }
}