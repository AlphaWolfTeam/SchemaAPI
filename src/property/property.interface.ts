
// import Types from "./enum.types";

export default interface IProperty{
    _id?: string,
    propertyName: string,
    propertyType: string,
    defaultValue?: string,
    propertyRef: string,
    enum?: string[],
    isUnique: boolean,
    index?: boolean,
    required?: boolean,
    // validate?: Function,
    createdAt: Date,
    updatedAt: Date,
    permissions?: string
}

