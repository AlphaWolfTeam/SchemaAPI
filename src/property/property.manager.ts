import {
  PropertyNotFoundError,
  InvalidIdError,
  InvalidValueInPropertyError,
  SchemaNotFoundError,
  DefaultValueIsNotValidError,
  EnumValuesAreNotValidError,
  PropertyRefExistError,
  PropertyRefNotExistError,
} from "./../utils/errors/user";
import PropertyRepository from "./property.repository";
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
import {
  dateValidationSchema,
  isDateValueValid,
  isDateValidationObjValid,
} from "./validation/date.validation";
import SchemaManager from "../schema/schema.manager";
import ISchema from "../schema/schema.interface";

const validator = new Validator();

export default class PropertyManager {
  static async create(property: IProperty): Promise<IProperty | null> {
    await this.validateProperty(property);
    return PropertyRepository.create({
      ...property,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).catch((error) => {
      throw error;
    });
  }

  static async getById(id: string): Promise<IProperty | null> {
    const property = await PropertyRepository.getById(id).catch(() => {
      throw new InvalidIdError();
    });
    if (property === null) {
      throw new PropertyNotFoundError();
    }
    return property;
  }

  static async deleteById(id: string): Promise<IProperty | null> {
    const property = await PropertyRepository.deleteById(id).catch(() => {
      throw new InvalidIdError();
    });
    if (property === null) {
      throw new PropertyNotFoundError();
    }
    return property;
  }

  static async updateById(
    id: string,
    newProperty: IProperty
  ): Promise<IProperty | null> {
    await this.validateProperty(newProperty);
    const property = await PropertyRepository.updateById(id, {
      ...newProperty,
      updatedAt: new Date(),
    }).catch(() => {
      throw new InvalidIdError();
    });
    if (property === null) {
      throw new PropertyNotFoundError();
    }
    return property;
  }

  private static async validateProperty(property: IProperty): Promise<void> {
    if (
      property.validation &&
      !this.isValidationObjValid(property.propertyType, property.validation)
    ) {
      throw new InvalidValueInPropertyError(property.propertyName);
    }

    if (property.propertyType === "ObjectId") {
      await this.validateObjectId(property);
    } else if (property.propertyRef) {
      throw new PropertyRefExistError();
    }

    if (property.defaultValue !== undefined) {
      await this.validateDefaultValue(property);
    }

    if (property.enum !== undefined) {
      await this.validateEnum(property);
    }
  }

  static async validateDefaultValue(property: IProperty): Promise<void> {
    property.defaultValue = await this.convertValue(
      property.defaultValue,
      property.propertyType,
      property.propertyName
    );
    if (
      property.validation &&
      !this.isValueValid(
        property.validation,
        property.propertyType,
        property.defaultValue
      )
    ) {
      throw new DefaultValueIsNotValidError(property.propertyName);
    }
    if (property.enum && !property.enum.includes(property.defaultValue)) {
      throw new InvalidValueInPropertyError(property.propertyName);
    }
  }

  static async validateObjectId(property: IProperty): Promise<void> {
    if (!property.propertyRef) {
      throw new PropertyRefNotExistError();
    } else if (!(await this.isSchemaExist(property.propertyRef))) {
      throw new SchemaNotFoundError();
    }
  }

  static async validateEnum(property: IProperty): Promise<void> {
    property.enum = await Promise.all(
      (property.enum as any[]).map((value) => {
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
          throw new EnumValuesAreNotValidError(property.propertyName);
        }
      });
    }
  }

  private static async convertValue(
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
        } else {
          return value;
        }
    }
  }

  private static isValidationObjValid(
    propertyType: string,
    validationObj: Object
  ): boolean {
    switch (propertyType) {
      case "Number":
        return validator.validate(validationObj, numberValidationSchema).valid;
      case "String":
        return validator.validate(validationObj, stringValidationSchema).valid;
      case "Date":
        return (
          validator.validate(validationObj, dateValidationSchema).valid &&
          isDateValidationObjValid(validationObj)
        );

      default:
        return false;
    }
  }

  private static isValueValid(
    validateObj: Object,
    propertyType: any,
    value: any
  ): boolean {
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

  private static isValidBoolean(value: any): boolean {
    return String(value) === "false" || String(value) === "true";
  }

  private static async isSchemaExist(name: string): Promise<boolean> {
    return ((await SchemaManager.getAll()) as ISchema[])
      .map((schema) => schema.schemaName)
      .includes(name);
  }
}
