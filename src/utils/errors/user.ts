import { UserError } from './application';

export class SchemaNotFoundError extends UserError {
    constructor() {
        super('Schema not found', 404);
    }
}

export class PropertyNotFoundError extends UserError {
    constructor() {
        super('Property not found', 404);
    }
}

export class PropertyNotInSchemaError extends UserError {
    constructor() {
        super('Property not in schema', 404);
    }
}

export class InvalidIdError extends UserError {
    constructor() {
        super('Invalid id', 404);
    }
}

export class InvalidValueInPropertyError extends UserError {
    constructor(propertyName: string) {
        super(`Invalid value in property: ${propertyName}`, 404);
    }
}

export class InvalidValueInSchemaError extends UserError {
    constructor() {
        super('Invalid value in schema', 404);
    }
}

export class PropertyNameAlreadyExistError extends UserError {
    constructor() {
        super('Property name is already exist in this schema', 404);
    }
}

export class DuplicatePropertyNameError extends UserError {
    constructor() {
        super('Property names are not unique in schema properties', 404);
    }
}

export class DuplicateSchemaNameError extends UserError {
    constructor() {
        super('There is already exist schema with this name', 404);
    }
}