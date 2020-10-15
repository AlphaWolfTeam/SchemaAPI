import * as mongoose from "mongoose";
import ISchema from "./schema.interface";
import config from "../config/index";

const SchemaSchema = new mongoose.Schema({
  schemaName: {
    type: String,
    required: true,
    unique: true,
  },
  schemaProperties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: config.mongo.propertyCollectionName,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const SchemaModel = mongoose.model<ISchema & mongoose.Document>(
  config.mongo.schemaCollectionName,
  SchemaSchema
);

export default SchemaModel;
