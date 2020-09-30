import { InvalidValueInPropertyError } from "./../utils/errors/user";
import PropertyModel from "./property.model";
import IProperty from "./property.interface";

export default class PropertyRepository {
    static async create(property: IProperty): Promise<IProperty | null> {
        return await PropertyModel.create(property).catch(() => {
            throw new InvalidValueInPropertyError(property.propertyName);
        });
    }

    static getById(_id: string): Promise<IProperty | null> {
        return PropertyModel.findById(_id).exec();
    }

    static deleteById(_id: string): Promise<IProperty | null> {
        return PropertyModel.findByIdAndRemove(_id).exec();
    }

    static updateById(
        _id: string,
        property: Partial<IProperty>
    ): Promise<IProperty | null> {
        return PropertyModel.findOneAndUpdate(
            { _id },
            { $set: property },
            { upsert: true }
        ).exec();
    }
}
