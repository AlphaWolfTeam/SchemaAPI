"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateSchemaNameError = exports.DuplicatePropertyNameError = exports.PropertyNameAlreadyExistError = exports.InvalidValueInSchemaError = exports.InvalidValueInPropertyError = exports.InvalidIdError = exports.PropertyNotInSchemaError = exports.PropertyNotFoundError = exports.SchemaNotFoundError = void 0;
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
class InvalidIdError extends application_1.UserError {
    constructor() {
        super('Invalid id', 404);
    }
}
exports.InvalidIdError = InvalidIdError;
class InvalidValueInPropertyError extends application_1.UserError {
    constructor() {
        super('Invalid value in property', 404);
    }
}
exports.InvalidValueInPropertyError = InvalidValueInPropertyError;
class InvalidValueInSchemaError extends application_1.UserError {
    constructor() {
        super('Invalid value in schema', 404);
    }
}
exports.InvalidValueInSchemaError = InvalidValueInSchemaError;
class PropertyNameAlreadyExistError extends application_1.UserError {
    constructor() {
        super('Property name is already exist in this schema', 404);
    }
}
exports.PropertyNameAlreadyExistError = PropertyNameAlreadyExistError;
class DuplicatePropertyNameError extends application_1.UserError {
    constructor() {
        super('Property names are not unique in schema properties', 404);
    }
}
exports.DuplicatePropertyNameError = DuplicatePropertyNameError;
class DuplicateSchemaNameError extends application_1.UserError {
    constructor() {
        super('There is already exist schema with this name', 404);
    }
}
exports.DuplicateSchemaNameError = DuplicateSchemaNameError;
//# sourceMappingURL=user.js.map