"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = require("../config/index");
const enum_types_1 = require("./enum.types");
const PropertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        enum: enum_types_1.default,
        required: true
    },
    defaultValue: {
        type: String,
        enum: enum_types_1.default,
        required: false
    },
    propertyRef: {
        type: String,
        required: true
    },
    enum: {
        type: [String],
        enum: enum_types_1.default,
        required: false
    },
    isUnique: {
        type: Boolean,
        required: true
    },
    index: {
        type: Boolean,
        required: false
    },
    required: {
        type: Boolean,
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    permissions: {
        type: String,
        required: false
    }
});
const PropertyModel = mongoose.model(index_1.default.mongo.propertyCollectionName, PropertySchema);
exports.default = PropertyModel;
//# sourceMappingURL=property.model.js.map