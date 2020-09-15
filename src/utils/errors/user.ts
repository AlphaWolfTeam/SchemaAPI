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

export class InvalidId extends UserError {
    constructor() {
        super('Invalid id', 404);
    }
}

export class InvalidValueInProperty extends UserError {
    constructor() {
        super('Invalid value in property', 404);
    }
}

export class InvalidValueInSchema extends UserError {
    constructor() {
        super('Invalid value in schema', 404);
    }
}