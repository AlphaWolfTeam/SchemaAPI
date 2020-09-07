import * as mongoose from 'mongoose';
import IProperty from '../property/property.interface'

export default interface ISchema {
    schemaId: mongoose.Schema.Types.ObjectId,
    schemaName: string,
    schemaProperties: IProperty[],
    permissions: Permissions,
    createdAt: Date,
    updatedAt: Date,
}
