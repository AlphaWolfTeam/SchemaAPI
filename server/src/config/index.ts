import * as env from "env-var";
import "./dotenv";

const config = {
  service: {
    port:
      parseInt(process.env.PORT as string) ||
      env.get("PORT").required().asPortNumber(),
  },
  client: {
    url: process.env.CLIENT_URI || env.get("CLIENT_URI").required().asString(),
  },
  mongo: {
    uri: process.env.MONGO_URI || env.get("MONGO_URI").required().asUrlString(),
    schemaCollectionName:
      process.env.MONGO_SCHEMA_COLLECTION_NAME ||
      env.get("MONGO_SCHEMA_COLLECTION_NAME").required().asString(),
    propertyCollectionName:
      process.env.MONGO_PROPERTY_COLLECTION_NAME ||
      env.get("MONGO_PROPERTY_COLLECTION_NAME").required().asString(),
  },
  rabbit: {
    uri:
      process.env.RABBIT_URI || env.get("RABBIT_URI").required().asUrlString(),
    retryOptions: {
      minTimeout:
        parseInt(process.env.RABBIT_RETRY_MIN_TIMEOUT as string) ||
        env.get("RABBIT_RETRY_MIN_TIMEOUT").default(1000).asIntPositive(),
      retries:
        parseInt(process.env.RABBIT_RETRY_RETRIES as string) ||
        env.get("RABBIT_RETRY_RETRIES").default(10).asIntPositive(),
      factor:
        parseInt(process.env.RABBIT_RETRY_FACTOR as string) ||
        env.get("RABBIT_RETRY_FACTOR").default(1.8).asFloatPositive(),
    },
    queueName:
      process.env.QUEUE_NAME || env.get("QUEUE_NAME").required().asString(),
  },
  test: {
    mongo: {
      uri: "mongodb://localhost",
    },
    rabbit: {
      uri: "amqp://localhost",
      retryOptions: {},
      queueName:
        process.env.QUEUE_NAME || env.get("QUEUE_NAME").required().asString(),
    },
  },
};

export default config;
