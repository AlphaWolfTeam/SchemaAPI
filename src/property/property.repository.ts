import {
  SchemaNotFoundError,
  InvalidValueInPropertyError,
} from "./../utils/errors/user";
import PropertyModel from "./property.model";
import IProperty from "./property.interface";
import moment from "moment";
import mongoose from "mongoose";
import { numberValidationSchema } from "./validationSchemas/number.validation";

import { Validator } from "jsonschema";
import { stringValidationSchema } from "./validationSchemas/string.validation";
import { dateValidationSchema } from "./validationSchemas/date.validation";
import SchemaRepository from "../schema/schema.repository";
const validator = new Validator();

export default class PropertyRepository {
  static async create(property: IProperty): Promise<IProperty | null> {
    const createdProperty = await PropertyModel.create(property).catch(() => {
      throw new InvalidValueInPropertyError(property.propertyName);
    });
    if (createdProperty.defaultValue) {
      createdProperty.defaultValue = await this.convertValue(createdProperty.defaultValue,createdProperty.propertyType, createdProperty.propertyName );
    }
    if (createdProperty.enum) {
      createdProperty.enum = await Promise.all(createdProperty.enum.map((value) => {
          return this.convertValue(value, createdProperty.propertyType,createdProperty.propertyName);
        })
      );
    }
    if (createdProperty.defaultValue && createdProperty.enum) {
      if (!createdProperty.enum.includes(createdProperty.defaultValue)) {
        throw new InvalidValueInPropertyError(createdProperty.propertyName);
      }
    }

    if (
      createdProperty.validation &&
      !this.isValidationObjValid(
        createdProperty.propertyType,
        createdProperty.validation
      )
    ) {
      throw new InvalidValueInPropertyError(createdProperty.propertyName);
    }

    return await this.updateById(
      createdProperty._id as string,
      createdProperty
    );
  }

  static isValidationObjValid(
    propertyType: string,
    validationObj: Object
  ): boolean {
    switch (propertyType) {
      case "Number":
        return validator.validate(validationObj, numberValidationSchema).valid;
      case "String":
        return validator.validate(validationObj, stringValidationSchema).valid;
      case "Date":
        return validator.validate(validationObj, dateValidationSchema).valid;

      default:
        return false;
    }
  }

  static async convertValue(value: any, newType: String, propertyName: string): Promise<any> {
    switch (newType) {
      case "String":
        return String(value);
      case "Number":
        if (isNaN(value)) {
          throw new InvalidValueInPropertyError(propertyName);
        } else {
          return Number(value);
        }
      case "Boolean":
        if (this.isValidBoolean(value)) {
          return Boolean(value);
        } else {
          throw new InvalidValueInPropertyError(propertyName);
        }
      case "Date":
        if (moment(value, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").isValid()) {
          return value;
        } else {
          throw new InvalidValueInPropertyError(propertyName);
        }
      case "ObjectId":
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new InvalidValueInPropertyError(propertyName);
        } else if (!(await this.isSchemaExist(value))) {
          throw new SchemaNotFoundError();
        } else {
          return value;
        }
    }
  }

  static isValidBoolean(value: any): boolean {
    return String(value) === "false" || String(value) === "true";
  }

  static async isSchemaExist(
    objectId: mongoose.Types.ObjectId
  ): Promise<boolean> {
    const returnedSchema = await SchemaRepository.getById(String(objectId));
    return returnedSchema !== null;
  }

  static getById(_id: string): Promise<IProperty | null> {
    return PropertyModel.findById(_id).exec();
  }

  static deleteById(_id: string): Promise<IProperty | null> {
    return PropertyModel.findByIdAndRemove(_id).exec();
  }

  static updateById(
    _id: string,
    property: Partial<IProperty>
  ): Promise<IProperty | null> {
    return PropertyModel.findOneAndUpdate(
      { _id },
      { $set: property },
      { upsert: true }
    ).exec();
  }
}
