import * as mongoose from 'mongoose';
import  IProperty  from './property.interface';
import config from '../config/index';
import Types from './enum.types';

const PropertySchema = new mongoose.Schema({
    // propertyId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     unique: true
    // },
    propertyName:{
        type: String,
        required: true
    },
    propertyType:{
        type: String,
        enum: Types,
        required: true
    },
    // defaultValue:{
    //     type: String,
    //     enum: Types,
    //     required: false
    // },
    defaultValue:{
        type: String,
        enum: Types,
        required: false
    },
    propertyRef:{
        type: String,
        required: true
    },
    // enum:{
    //     type: [String],
    //     enum: Types,
    //     required: false
    // },
    enum:{
        type: [String],
        enum: Types,
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

const PropertyModel = mongoose.model<IProperty & mongoose.Document>(config.mongo.propertyCollectionName, PropertySchema);

export default PropertyModel;
