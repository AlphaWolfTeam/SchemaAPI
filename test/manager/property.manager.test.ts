import chai from 'chai';
import mongoose from 'mongoose';
import config from '../../src/config/index';
import PropertyModel from '../../src/property/property.model';
import PropertyManager from '../../src/property/property.manager';
import IProperty from '../../src/property/property.interface';

const { expect } = chai;
const { mongo } = config;

describe('Property Manager', () => {
    const propertyExample: IProperty = {
        propertyName: "property name",
        propertyType: "Number",
        defaultValue: 1,
        propertyRef: "property ref",
        enum: [1, 2, 3],
        isUnique: true,
        index: true,
        required: true,
        createdAt: new Date("2013-10-01T00:00:00.000Z"),
        updatedAt: new Date("2013-10-01T00:00:00.000Z"),
        permissions: "property premissions"
    };

    before(async () => {
        await mongoose.connect(mongo.testUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    });

    after(async () => {
        await mongoose.connection.close();
    });

    describe('Create', () => {
        afterEach(async () => {
            await PropertyModel.deleteMany({}).exec();
        });

        it('Should create property', async () => {
            const result = await PropertyManager.create(propertyExample) as IProperty;

            expect(result).to.exist;
            expect(result).to.have.property('_id');
            expect(result).to.have.property('propertyName', propertyExample.propertyName);
            expect(result).to.have.property('propertyType', propertyExample.propertyType);
            expect(result).to.have.property('defaultValue', propertyExample.defaultValue);
            expect(result).to.have.property('propertyRef', propertyExample.propertyRef);
            expect(JSON.stringify(result.enum)).to.equals( JSON.stringify(propertyExample.enum));
            expect(result).to.have.property('isUnique', propertyExample.isUnique);
            expect(result).to.have.property('index', propertyExample.index);
            expect(result).to.have.property('required', propertyExample.required);
            expect(JSON.stringify(result.createdAt)).to.equals( JSON.stringify(propertyExample.createdAt));
            expect(JSON.stringify(result.updatedAt)).to.equals( JSON.stringify(propertyExample.updatedAt));
            expect(result).to.have.property('permissions', propertyExample.permissions);
        });
    });

    describe('Get by id', () => {
        let property: IProperty;

        beforeEach(async () => {
            property = await PropertyManager.create(propertyExample) as IProperty;
        });

        afterEach(async () => {
            await PropertyModel.deleteMany({}).exec();
        });

        it('Should return property', async () => {
            const result = await PropertyManager.getById(property._id as string) as IProperty;

            expect(result).to.exist;
            expect(result).to.have.property('_id');
            expect(result).to.have.property('propertyName', property.propertyName);
            expect(result).to.have.property('propertyType', property.propertyType);
            expect(result).to.have.property('defaultValue', property.defaultValue);
            expect(result).to.have.property('propertyRef', property.propertyRef);
            expect(JSON.stringify(result.enum)).to.equals( JSON.stringify(property.enum));
            expect(result).to.have.property('isUnique', property.isUnique);
            expect(result).to.have.property('index', property.index);
            expect(result).to.have.property('required', property.required);
            expect(JSON.stringify(result.createdAt)).to.equals( JSON.stringify(property.createdAt));
            expect(JSON.stringify(result.updatedAt)).to.equals( JSON.stringify(property.updatedAt));
            expect(result).to.have.property('permissions', property.permissions);
        });
    });

    describe('Delete by id', () => {
        let property: IProperty;

        beforeEach(async () => {
            property = await PropertyManager.create(propertyExample) as IProperty;
        });

        afterEach(async () => {
            await PropertyModel.deleteMany({}).exec();
        });

        it('Should delete property', async () => {
            await PropertyManager.deleteById(property._id as string);
            const propertiesList = await PropertyModel.find().exec();
            expect(propertiesList.length).to.equal(0);
        });
    });

});