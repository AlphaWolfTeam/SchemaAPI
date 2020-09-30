import {
  SchemaNotFoundError,
  InvalidValueInPropertyError,
  DefaultValueIsNotValid,
  EnumValuesAreNotValid,
} from "./../utils/errors/user";
import PropertyModel from "./property.model";
import IProperty from "./property.interface";
import moment from "moment";
import mongoose from "mongoose";
import {
  isNumberValueValid,
  numberValidationSchema,
} from "./validation/number.validation";
import { Validator } from "jsonschema";
import {
  isStringValueValid,
  stringValidationSchema,
} from "./validation/string.validation";
import { dateValidationSchema, isDateValueValid, isDateValidationObjValid } from "./validation/date.validation";
import SchemaRepository from "../schema/schema.repository";
const validator = new Validator();

export default class PropertyRepository {
  static async create(property: IProperty): Promise<IProperty | null> {
    if (property.validation &&!this.isValidationObjValid(property.propertyType, property.validation)) {
      throw new InvalidValueInPropertyError(property.propertyName);
    }
    if (property.defaultValue !== undefined) {
      property.defaultValue = await this.convertValue(
        property.defaultValue,
        property.propertyType,
        property.propertyName
      );
      if (property.validation &&!this.isValueValid(property.validation,property.propertyType,property.defaultValue)) {
        throw new DefaultValueIsNotValid(property.propertyName);
      }
    }
    if (property.enum) {
      property.enum = await Promise.all(
        property.enum.map((value) => {
          return this.convertValue(
            value,
            property.propertyType,
            property.propertyName
          );
        })
      );
      if (property.validation) {
        property.enum.forEach((value: any) => {
          if (
            !this.isValueValid(
              property.validation as Object,
              property.propertyType,
              value
            )
          ) {
            throw new EnumValuesAreNotValid(property.propertyName);
          }
        });
      }
    }
    if (
      property.defaultValue !== undefined &&
      property.enum &&
      !property.enum.includes(property.defaultValue)
    ) {
      throw new InvalidValueInPropertyError(property.propertyName);
    }

    return await PropertyModel.create(property).catch(() => {
      throw new InvalidValueInPropertyError(property.propertyName);
    });
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
        return validator.validate(validationObj, dateValidationSchema).valid && isDateValidationObjValid(validationObj);

      default:
        return false;
    }
  }

  static async convertValue(
    value: any,
    newType: String,
    propertyName: string
  ): Promise<any> {
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

  static isValueValid(validateObj: Object,propertyType: any,value: any): boolean {
    switch (propertyType) {
      case "Number":
        return isNumberValueValid(value, validateObj);
      case "String":
        return isStringValueValid(value, validateObj);
      case "Date":
        return isDateValueValid(value, validateObj);
      default:
        return false;
    }
  }
}
