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

export class InvalidId extends UserError {
    constructor() {
        super('Invalid id', 404);
    }
}

export class InvalidValue extends UserError {
    constructor() {
        super('Invalid value', 404);
    }
}