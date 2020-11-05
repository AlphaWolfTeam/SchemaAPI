import menash from "menashmq";
import ISchema from "../../schema/schema.interface";
import IRabbitMessage from "./rabbitMessage.interface";

export const initRabbit = async (
  uri: string,
  retryOptions: object,
  queueName: string
) => {
  console.log("Connecting to Rabbit...");
  await menash.connect(uri, retryOptions);
  console.log("Rabbit connected");
  await menash.declareQueue(queueName);
  console.log("Rabbit initialized");
};

const sendDataToRabbit = async (queueName: string, data: IRabbitMessage) => {
  return menash.send(queueName, data);
};

export const sendCreateSchemaMethod = async (
  queueName: string,
  createdSchema: ISchema
): Promise<void> => {
  await sendDataToRabbit(queueName, {
    method: "create schema",
    schema: createdSchema,
  } as IRabbitMessage);
};

export const sendUpdateSchemaMethod = async (
  queueName: string,
  updatedSchema: ISchema,
  prevSchema: ISchema
): Promise<void> => {
  await sendDataToRabbit(queueName, {
    method: "update schema",
    schema: updatedSchema,
    prevSchema: prevSchema,
  } as IRabbitMessage);
};

export const sendDeleteSchemaMethod = async (
  queueName: string,
  deletedSchemaName: string
): Promise<void> => {
  await sendDataToRabbit(queueName, {
    method: "delete schema",
    schemaName: deletedSchemaName,
  } as IRabbitMessage);
};

export const sendDeletePropertyMethod = async (
  queueName: string,
  deletedPropertyName: string,
  schemaName: string
): Promise<void> => {
  await sendDataToRabbit(queueName, {
    method: "delete property",
    schemaName: schemaName,
    propertyName: deletedPropertyName,
  } as IRabbitMessage);
};
