"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidValueInSchema = exports.InvalidValueInProperty = exports.InvalidId = exports.PropertyNotInSchemaError = exports.PropertyNotFoundError = exports.SchemaNotFoundError = void 0;
const application_1 = require("./application");
class SchemaNotFoundError extends application_1.UserError {
    constructor() {
        super('Schema not found', 404);
    }
}
exports.SchemaNotFoundError = SchemaNotFoundError;
class PropertyNotFoundError extends application_1.UserError {
    constructor() {
        super('Property not found', 404);
    }
}
exports.PropertyNotFoundError = PropertyNotFoundError;
class PropertyNotInSchemaError extends application_1.UserError {
    constructor() {
        super('Property not in schema', 404);
    }
}
exports.PropertyNotInSchemaError = PropertyNotInSchemaError;
class InvalidId extends application_1.UserError {
    constructor() {
        super('Invalid id', 404);
    }
}
exports.InvalidId = InvalidId;
class InvalidValueInProperty extends application_1.UserError {
    constructor() {
        super('Invalid value in property', 404);
    }
}
exports.InvalidValueInProperty = InvalidValueInProperty;
class InvalidValueInSchema extends application_1.UserError {
    constructor() {
        super('Invalid value in schema', 404);
    }
}
exports.InvalidValueInSchema = InvalidValueInSchema;
//# sourceMappingURL=user.js.map