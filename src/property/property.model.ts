import * as mongoose from 'mongoose';
import IProperty from './property.interface';
import config from '../config/index';
import Types from './enum.types';

const PropertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        enum: Types,
        required: true
    },
    defaultValue: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    propertyRef: {
        type: String,
        required: true
    },
    enum: {
        type: [mongoose.Schema.Types.Mixed],
        required: false
    },
    isUnique: {
        type: Boolean,
        required: true
    },
    index: {
        type: Boolean,
        required: false
    },
    required: {
        type: Boolean,
        required: false
    },
    // validate:{
    // type: Function, 
    // required: false
    // } ,
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    permissions: {
        type: String,
        required: false
    }
});

// PropertySchema.pre('save', function (next) {
//     const currentProperty: any = this as any;
//     // console.log('this ' + currentProperty.propertyType);
//     currentProperty.defaultValue = 'hhhh';
//     next()
// });

const PropertyModel = mongoose.model<IProperty & mongoose.Document>(config.mongo.propertyCollectionName, PropertySchema);

export default PropertyModel;
