"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownErrorHandler = exports.serverErrorHandler = exports.userErrorHandler = void 0;
const application_1 = require("./application");
const userErrorHandler = (error, _req, res, next) => {
    if (error instanceof application_1.UserError) {
        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });
        next();
    }
    else {
        next(error);
    }
};
exports.userErrorHandler = userErrorHandler;
const serverErrorHandler = (error, _req, res, next) => {
    if (error instanceof application_1.ServerError) {
        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });
        next();
    }
    else {
        next(error);
    }
};
exports.serverErrorHandler = serverErrorHandler;
const unknownErrorHandler = (error, _req, res, next) => {
    res.status(error && error.status ? error.status : 500).send({
        type: error.name,
        message: error.message,
    });
    next(error);
};
exports.unknownErrorHandler = unknownErrorHandler;
//# sourceMappingURL=handler.js.map