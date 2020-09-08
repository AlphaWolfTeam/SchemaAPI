import Types from './enum.types'

export default interface IProperty{
    _id: string,
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

