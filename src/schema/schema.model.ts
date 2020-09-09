import * as mongoose from 'mongoose';
import  ISchema  from './schema.interface';
import config from '../config/index';

const SchemaSchema = new mongoose.Schema({
    // schemaId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     unique: true
    // },
    schemaName:{
        type: String,
        required: true
    },
    schemaProperties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
      }],
    permissions:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    }, 
    updatedAt:{
        type: Date,
        required: true
    },
});

const SchemaModel = mongoose.model<ISchema & mongoose.Document>(config.mongo.schemaCollectionName, SchemaSchema);

export default SchemaModel;
