import ISchema from "../../schema/schema.interface";

export default interface IRabbitMessage {
  method: string;
  schema?: ISchema;
  propertyName?: string;
  schemaName?: string;
  prevSchemaName?: string;
}
