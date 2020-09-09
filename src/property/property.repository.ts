import PropertyModel from './property.model';
import IProperty from './property.interface';

export default class PropertyRepository {
    static async create(property: IProperty): Promise<IProperty | null> {
        const createdProperty = await PropertyModel.create(property) as IProperty;
        if (createdProperty.defaultValue) {
            createdProperty.defaultValue = this.convertValue(createdProperty.defaultValue, createdProperty.propertyType);
        }
        if (createdProperty.enum) {
            createdProperty.enum = createdProperty.enum.map(value => {
                return this.convertValue(value, createdProperty.propertyType);
            })
        }
        return await this.updateById(createdProperty._id as string, createdProperty);
    }

    static convertValue(value: any, newType: String): any {
        switch (newType) {
            case 'String':
                return new String(value);
            case 'Number':
                return new Number(value);
            case 'Boolean':
                return new Boolean(value);
            case 'Date':
                return new Date(value);
            case 'Array':
                return new Array(value);
            case 'ObjectId':
                return new String(value);
        }
    }

    static getById(_id: string): Promise<IProperty | null> {
        return PropertyModel.findById(_id).exec();
    }

    static deleteById(_id: string): Promise<IProperty | null> {
        return PropertyModel.findByIdAndRemove(_id).exec();
    }

    static updateById(_id: string, property: Partial<IProperty>): Promise<IProperty | null> {
        return PropertyModel.findOneAndUpdate({ _id }, { $set: property }, { upsert: true }).exec();
    }
}