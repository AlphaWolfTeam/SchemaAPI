"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.NotPermittedError = exports.ValidationError = void 0;
const application_1 = require("./application");
class ValidationError extends application_1.UserError {
    constructor() {
        super('Validation error', 400);
    }
}
exports.ValidationError = ValidationError;
class NotPermittedError extends application_1.UserError {
    constructor() {
        super('Operation not permitted', 403);
    }
}
exports.NotPermittedError = NotPermittedError;
class NotFoundError extends application_1.UserError {
    constructor() {
        super('Resource not found', 404);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=user.js.map