import ISchema from '../src/schema/schema.interface';
import IProperty from '../src/property/property.interface';

export const schemaExample: ISchema = {
  schemaName: 'schema name',
  schemaProperties: [],
};
export const propertyNumberExample: IProperty = {
  propertyName: "property name",
  propertyType: "Number",
  defaultValue: 1,
  enum: [1, 2, 3],
  isUnique: true,
  index: true,
  required: true,
  validation: {biggerThan: 0}
};

export const propertyStringExample: IProperty = {
  propertyName: "property name",
  propertyType: "String",
  defaultValue: "hello",
  enum: ["hello", "heyyy"],
  isUnique: true,
  index: true,
  required: true,
  validation: {length: 5}
};

export const propertyDateExample: IProperty = {
  propertyName: "property name",
  propertyType: "Date",
  defaultValue: "2010-10-01T00:00:00.000Z",
  enum: ["2010-10-01T00:00:00.000Z", "2012-11-01T00:00:00.000Z"],
  isUnique: true,
  index: true,
  required: true,
  validation: {after: "2000-10-01T00:00:00.000Z"}
};

export const propertyBooleanExample: IProperty = {
  propertyName: "property name",
  propertyType: "Boolean",
  defaultValue: true,
  enum: [true, false],
  isUnique: true,
  index: true,
  required: true
};

export const propertyObjectIdExample: IProperty = {
  propertyName: "property name",
  propertyType: "ObjectId",
  isUnique: true,
  index: true,
  required: true
};
export const ID_NOT_EXIST = '111111111111111111111111';
export const INVALID_ID = 'invalidId';
export const INVALID_REF_NAME = 'invalid Schema Ref name';