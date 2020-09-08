"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = require("env-var");
require("./dotenv");
const config = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
    },
    mongo: {
        uri: env.get('MONGO_URI').required().asUrlString(),
        schemaCollectionName: env.get('MONGO_SCHEMA_COLLECTION_NAME').required().asString(),
        propertyCollectionName: env.get('MONGO_PROPERTY_COLLECTION_NAME').required().asString(),
    },
};
exports.default = config;
//# sourceMappingURL=index.js.map