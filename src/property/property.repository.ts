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
const validator = new Validator();

export default class PropertyRepository {
  static async create(property: IProperty): Promise<IProperty | null> {
    const createdProperty = await PropertyModel.create(property).catch(() => {
      throw new InvalidValueInPropertyError();
    });
    if (createdProperty.defaultValue) {
      createdProperty.defaultValue = await this.convertValue(createdProperty.defaultValue,createdProperty.propertyType);
    }
    if (createdProperty.enum) {
      createdProperty.enum = await Promise.all(createdProperty.enum.map((value) => {
          return this.convertValue(value, createdProperty.propertyType);
        })
      );
    }
    if (createdProperty.defaultValue && createdProperty.enum) {
      if (!createdProperty.enum.includes(createdProperty.defaultValue)) {
        throw new InvalidValueInPropertyError();
      }
    }

    if (
      createdProperty.validation &&
      !this.isValidationObjValid(
        createdProperty.propertyType,
        createdProperty.validation
      )
    ) {
      throw new InvalidValueInPropertyError();
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

  static async convertValue(value: any, newType: String): Promise<any> {
    switch (newType) {
      case "String":
        return String(value);
      case "Number":
        if (isNaN(value)) {
          throw new InvalidValueInPropertyError();
        } else {
          return Number(value);
        }
      case "Boolean":
        if (this.isValidBoolean(value)) {
          return Boolean(value);
        } else {
          throw new InvalidValueInPropertyError();
        }
      case "Date":
        if (moment(value, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").isValid()) {
          return value;
        } else {
          throw new InvalidValueInPropertyError();
        }
      case "ObjectId":
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new InvalidValueInPropertyError();
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
    const returnedSchema = await PropertyRepository.getById(String(objectId));
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
