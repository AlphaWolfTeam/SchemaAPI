// import * as mongoose from 'mongoose';
import IProperty from '../property/property.interface'

export default interface ISchema {
    schemaName: string,
    schemaProperties: IProperty[],
    permissions: string,
    createdAt: Date,
    updatedAt: Date,
}
