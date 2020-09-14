"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = exports.ServerError = exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(message, status) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message || 'Error: Undefined Application Error';
        this.status = status || 500;
    }
}
exports.ApplicationError = ApplicationError;
class ServerError extends ApplicationError {
    constructor(message, status) {
        super(message || 'Internal Server Error', status || 500);
    }
}
exports.ServerError = ServerError;
class UserError extends ApplicationError {
    constructor(message, status) {
        super(message || 'User Error', status || 400);
    }
}
exports.UserError = UserError;
//# sourceMappingURL=application.js.map