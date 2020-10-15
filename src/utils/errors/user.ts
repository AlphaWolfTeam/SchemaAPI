import { UserError } from "./application";

export class SchemaNotFoundError extends UserError {
  constructor() {
    super("Schema not found", 404);
  }
}

export class PropertyNotFoundError extends UserError {
  constructor() {
    super("Property not found", 404);
  }
}

export class PropertyNotInSchemaError extends UserError {
  constructor() {
    super("Property not in schema", 404);
  }
}

export class InvalidIdError extends UserError {
  constructor() {
    super("Invalid id", 404);
  }
}

export class InvalidValueInPropertyError extends UserError {
  constructor(propertyName: string) {
    super(`Invalid value in property: ${propertyName}`, 404);
  }
}

export class InvalidValueInSchemaError extends UserError {
  constructor() {
    super("Invalid value in schema", 404);
  }
}

export class DuplicatePropertyNameError extends UserError {
  constructor() {
    super("Property names are not unique in schema properties", 404);
  }
}

export class DuplicateSchemaNameError extends UserError {
  constructor() {
    super("There is already exist schema with this name", 404);
  }
}

export class DefaultValueIsNotValidError extends UserError {
  constructor(propertyName: String) {
    super(`Invalid default value in property: ${propertyName}`, 404);
  }
}

export class EnumValuesAreNotValidError extends UserError {
  constructor(propertyName: String) {
    super(`Invalid enum values in property: ${propertyName}`, 404);
  }
}

export class PermissionDeniedError extends UserError {
  constructor() {
    super(`Permission denied`, 404);
  }
}

export class PropertyRefNotExistError extends UserError {
  constructor() {
    super(`Property ref not exist in this property`, 404);
  }
}

export class PropertyRefExistError extends UserError {
  constructor() {
    super(`Property ref shouldn't be exist in this property`, 404);
  }
}
