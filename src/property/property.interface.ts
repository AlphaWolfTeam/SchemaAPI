import * as mongoose from 'mongoose';
import Types from './enum.types'

export default interface IProperty{
    propertyId: mongoose.Schema.Types.ObjectId,
    propertyName: string,
    propertyType: Types,
    defaultValue?: Types,
    propertyRef: string,
    enum?: Types[],
    isUnique: boolean,
    index?: boolean,
    required?: boolean,
    validate?: Function,
    createdAt: Date,
    updatedAt: Date,
    permissions?: Permissions
}

