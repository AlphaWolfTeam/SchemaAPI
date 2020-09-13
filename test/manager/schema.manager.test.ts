import chai from 'chai';
import mongoose from 'mongoose';
import config from '../../src/config/index';
import SchemaModel from '../../src/schema/schema.model';
import SchemaManager from '../../src/schema/schema.manager';
import ISchema from '../../src/schema/schema.interface';

const { expect } = chai;
const { mongo } = config;

describe('Schema Manager', () => {
    const schemaExample: ISchema = {
        schemaName: 'schema name',
        schemaProperties: [],
        permissions: 'schema premissions',
        createdAt: new Date("2013-10-01T00:00:00.000Z"),
        updatedAt: new Date("2013-10-01T00:00:00.000Z")
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
            await SchemaModel.deleteMany({}).exec();
        });

        it('Should create schema', async () => {
            const result = await SchemaManager.create(schemaExample, []) as ISchema;

            expect(result).to.exist;
            expect(result).to.have.property('_id');
            expect(result).to.have.property('schemaName', schemaExample.schemaName);
            expect(JSON.stringify(result.schemaProperties)).to.equals( JSON.stringify(schemaExample.schemaProperties));
            expect(result).to.have.property('permissions', schemaExample.permissions);
            expect(JSON.stringify(result.createdAt)).to.equals( JSON.stringify(schemaExample.createdAt));
            expect(JSON.stringify(result.updatedAt)).to.equals( JSON.stringify(schemaExample.updatedAt));
        });
    });

    describe('Get by id', () => {
        let schema: ISchema;

        beforeEach(async () => {
            schema = await SchemaManager.create(schemaExample, []) as ISchema;
        });

        afterEach(async () => {
            await SchemaModel.deleteMany({}).exec();
        });

        it('Should return schema', async () => {
            const result = await SchemaManager.getById(schema._id as string) as ISchema;

            expect(result).to.exist;
            expect(result).to.have.property('_id');
            expect(result).to.have.property('schemaName', schema.schemaName);
            expect(JSON.stringify(result.schemaProperties)).to.equals( JSON.stringify(schema.schemaProperties));
            expect(result).to.have.property('permissions', schema.permissions);
            expect(JSON.stringify(result.createdAt)).to.equals( JSON.stringify(schema.createdAt));
            expect(JSON.stringify(result.updatedAt)).to.equals( JSON.stringify(schema.updatedAt));
        });
    });

    describe('Delete schema', () => {
        let schema: ISchema;

        beforeEach(async () => {
            schema = await SchemaManager.create(schemaExample, []) as ISchema;
        });

        afterEach(async () => {
            await SchemaModel.deleteMany({}).exec();
        });


        it('Should delete schema', async () => {
            await SchemaManager.deleteSchema(schema._id as string);
            const schemasList = await SchemaManager.getAll() as ISchema[];
            expect(schemasList.length).to.equal(0);
        });
    });

});