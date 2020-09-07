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
        featureCollectionName: env.get('MONGO_FEATURE_COLLECTION_NAME').required().asString(),
    },
};
exports.default = config;
//# sourceMappingURL=index.js.map