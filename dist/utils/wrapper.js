"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapAsyncPermissions = exports.wrapAsync = void 0;
exports.wrapAsync = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};
exports.wrapAsyncPermissions = (func, permission) => {
    return (req, res, next) => {
        func(req, res, next, permission).catch(next);
    };
};
//# sourceMappingURL=wrapper.js.map