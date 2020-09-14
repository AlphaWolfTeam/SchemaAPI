import { SchemaNotFoundError } from './../../src/utils/errors/user';
import chai from 'chai';
import mongoose from 'mongoose';
import config from '../../src/config/index';
import SchemaModel from '../../src/schema/schema.model';
import SchemaManager from '../../src/schema/schema.manager';
import ISchema from '../../src/schema/schema.interface';
import { InvalidId } from '../../src/utils/errors/user';

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
    const ID_NOT_EXIST = '111111111111111111111111';
    const INVALID_ID = 'invalidId';

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
            const res = await SchemaManager.create(schemaExample, []) as ISchema;

            expect(res).to.exist;
            expect(res).to.have.property('_id');
            expect(res).to.have.property('schemaName', schemaExample.schemaName);
            expect(JSON.stringify(res.schemaProperties)).to.equals(JSON.stringify(schemaExample.schemaProperties));
            expect(res).to.have.property('permissions', schemaExample.permissions);
            expect(JSON.stringify(res.createdAt)).to.equals(JSON.stringify(schemaExample.createdAt));
            expect(JSON.stringify(res.updatedAt)).to.equals(JSON.stringify(schemaExample.updatedAt));
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

        context('Valid id', () => {
            it('Should return schema', async () => {
                const res = await SchemaManager.getById(schema._id as string) as ISchema;

                expect(res).to.exist;
                expect(res).to.have.property('_id');
                expect(res).to.have.property('schemaName', schema.schemaName);
                expect(JSON.stringify(res.schemaProperties)).to.equals(JSON.stringify(schema.schemaProperties));
                expect(res).to.have.property('permissions', schema.permissions);
                expect(JSON.stringify(res.createdAt)).to.equals(JSON.stringify(schema.createdAt));
                expect(JSON.stringify(res.updatedAt)).to.equals(JSON.stringify(schema.updatedAt));
            });
        });

        context('Invalid id', () => {
            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await SchemaManager.getById(INVALID_ID);
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof InvalidId).to.be.true;
                }
            });
        });

        context('Schema that not exist', () => {
            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await SchemaManager.getById(ID_NOT_EXIST);
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof SchemaNotFoundError).to.be.true;
                }
            });
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

        context('Valid id', () => {
            it('Should delete schema', async () => {
                await SchemaManager.deleteSchema(schema._id as string);
                const schemasList = await SchemaManager.getAll() as ISchema[];
                expect(schemasList.length).to.equal(0);
            });
        });

        context('Invalid id', () => {
            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await SchemaManager.deleteSchema(INVALID_ID);
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof InvalidId).to.be.true;
                }
            });
        });

        context('Schema that not exist', () => {
            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await SchemaManager.deleteSchema(ID_NOT_EXIST);
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof SchemaNotFoundError).to.be.true;
                }
            });
        });
    });

});