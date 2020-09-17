import ISchema from '../src/schema/schema.interface';
import IProperty from '../src/property/property.interface';

export const schemaExample: ISchema = {
  schemaName: 'schema name',
  schemaProperties: [],
  permissions: 'schema premissions',
  createdAt: new Date("2013-10-01T00:00:00.000Z"),
  updatedAt: new Date("2013-10-01T00:00:00.000Z")
};
export const propertyExample: IProperty = {
  propertyName: "property name",
  propertyType: "Number",
  defaultValue: 1,
  propertyRef: "property ref",
  enum: [1, 2, 3],
  isUnique: true,
  index: true,
  required: true,
  createdAt: new Date("2013-10-01T00:00:00.000Z"),
  updatedAt: new Date("2013-10-01T00:00:00.000Z"),
};
export const ID_NOT_EXIST = '111111111111111111111111';
export const INVALID_ID = 'invalidId';