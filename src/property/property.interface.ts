export default interface IProperty{
    _id?: string,
    propertyName: string,
    propertyType: string,
    defaultValue?: any,
    propertyRef: string,
    enum?: any[],
    isUnique: boolean,
    index?: boolean,
    required?: boolean,
    // validate?: Function,
    createdAt: Date,
    updatedAt: Date,
    permissions?: string
}

