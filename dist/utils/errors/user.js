"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidValue = exports.InvalidId = exports.PropertyNotFoundError = exports.SchemaNotFoundError = void 0;
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
class InvalidId extends application_1.UserError {
    constructor() {
        super('Invalid id', 404);
    }
}
exports.InvalidId = InvalidId;
class InvalidValue extends application_1.UserError {
    constructor() {
        super('Invalid value', 404);
    }
}
exports.InvalidValue = InvalidValue;
//# sourceMappingURL=user.js.map