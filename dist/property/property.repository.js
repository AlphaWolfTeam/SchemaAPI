"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./../utils/errors/user");
const property_model_1 = __importDefault(require("./property.model"));
class PropertyRepository {
    static create(property) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield property_model_1.default.create(property).catch(() => {
                throw new user_1.InvalidValueInPropertyError(property.propertyName);
            });
        });
    }
    static getById(_id) {
        return property_model_1.default.findById(_id).exec();
    }
    static deleteById(_id) {
        return property_model_1.default.findByIdAndRemove(_id).exec();
    }
    static updateById(_id, property) {
        return property_model_1.default.findOneAndUpdate({ _id }, { $set: property }, { upsert: true }).exec();
    }
    static updatePropertyRef(prevPropertyRef, newPropertyRef) {
        return __awaiter(this, void 0, void 0, function* () {
            yield property_model_1.default.updateMany({ propertyRef: prevPropertyRef }, { $set: { propertyRef: newPropertyRef } }).exec();
        });
    }
}
exports.default = PropertyRepository;
//# sourceMappingURL=property.repository.js.map