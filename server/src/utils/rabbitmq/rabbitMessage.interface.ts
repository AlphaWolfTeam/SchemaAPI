import ISchema from "../../schema/schema.interface";

export default interface IRabbitMessage {
  method: string;
  schema?: ISchema;
  prevSchema?: ISchema;
  schemaName?: string;
  propertyName?: string;
}
