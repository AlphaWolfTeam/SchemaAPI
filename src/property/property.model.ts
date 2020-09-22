import * as mongoose from "mongoose";
import IProperty from "./property.interface";
import config from "../config/index";
import Types from "./enum.types";

const PropertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    enum: Types,
    required: true,
  },
  defaultValue: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  propertyRef: {
    type: String,
    required: false,
  },
  enum: {
    type: [mongoose.Schema.Types.Mixed],
    required: false,
  },
  isUnique: {
    type: Boolean,
    required: true,
  },
  index: {
    type: Boolean,
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
  },
  validation: {
    type: Object,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const PropertyModel = mongoose.model<IProperty & mongoose.Document>(
  config.mongo.propertyCollectionName,
  PropertySchema
);

export default PropertyModel;
