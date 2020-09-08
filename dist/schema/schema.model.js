"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = require("../config/index");
const SchemaSchema = new mongoose.Schema({
    schemaId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    schemaName: {
        type: String,
        required: true
    },
    schemaProperties: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true
        }],
    permissions: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
});
const SchemaModel = mongoose.model(index_1.default.mongo.schemaCollectionName, SchemaSchema);
exports.default = SchemaModel;
//# sourceMappingURL=schema.model.js.map