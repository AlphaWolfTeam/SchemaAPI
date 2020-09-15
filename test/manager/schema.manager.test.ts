import {
    SchemaNotFoundError,
    PropertyNotFoundError,
    PropertyNotInSchemaError,
    InvalidValueInProperty
} from './../../src/utils/errors/user';
import chai from 'chai';
import mongoose from 'mongoose';
import config from '../../src/config/index';
import SchemaModel from '../../src/schema/schema.model';
import SchemaManager from '../../src/schema/schema.manager';
import ISchema from '../../src/schema/schema.interface';
import { InvalidId } from '../../src/utils/errors/user';
import { schemaExample, propertyExample, ID_NOT_EXIST, INVALID_ID } from '../dataExamples';
import PropertyModel from '../../src/property/property.model';
import IProperty from '../../src/property/property.interface';
import PropertyManager from '../../src/property/property.manager';

const { expect } = chai;
const { mongo } = config;

describe('Schema Manager', () => {

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

        context('Valid types', () => {
            it('Should create schema', async () => {
                const res = await SchemaManager.create({ ...schemaExample }, []) as ISchema;

                expect(res).to.exist;
                expect(res).to.have.property('_id');
                expect(res).to.have.property('schemaName', schemaExample.schemaName);
                expect(JSON.stringify(res.schemaProperties)).to.equals(JSON.stringify(schemaExample.schemaProperties));
                expect(res).to.have.property('permissions', schemaExample.permissions);
                expect(JSON.stringify(res.createdAt)).to.equals(JSON.stringify(schemaExample.createdAt));
                expect(JSON.stringify(res.updatedAt)).to.equals(JSON.stringify(schemaExample.updatedAt));
            });
        });
    });

    describe('Get by id', () => {
        let schema: ISchema;

        beforeEach(async () => {
            schema = await SchemaManager.create({ ...schemaExample }, []) as ISchema;
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

    describe('Get all', () => {
        let schemas: ISchema[] = [];

        beforeEach(async () => {
            schemas.push(await SchemaManager.create({ ...schemaExample }, []) as ISchema);
            schemas.push(await SchemaManager.create({ ...schemaExample }, []) as ISchema);
        });

        afterEach(async () => {
            await SchemaModel.deleteMany({}).exec();
        });

        it('Should return schemas list', async () => {
            const res = await SchemaManager.getAll() as ISchema[];

            expect(res).to.exist;
            res.map((schema: ISchema) => {
                expect(schema).to.have.property('_id');
                expect(schema).to.have.property('schemaName', schema.schemaName);
                expect(JSON.stringify(schema.schemaProperties)).to.equals(JSON.stringify(schema.schemaProperties));
                expect(schema).to.have.property('permissions', schema.permissions);
                expect(JSON.stringify(schema.createdAt)).to.equals(JSON.stringify(schema.createdAt));
                expect(JSON.stringify(schema.updatedAt)).to.equals(JSON.stringify(schema.updatedAt));
            })
        });
    });

    describe('Delete schema', () => {
        let schema: ISchema;

        beforeEach(async () => {
            schema = await SchemaManager.create({ ...schemaExample }, []) as ISchema;
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

    describe('Delete property', () => {
        let schema: ISchema;

        beforeEach(async () => {
            schema = await SchemaManager.create(
                { ...schemaExample },
                [{ ...propertyExample }]) as ISchema;
        });

        afterEach(async () => {
            await SchemaModel.deleteMany({}).exec();
            await PropertyModel.deleteMany({}).exec();
        });

        context('Valid id', () => {
            it('Should delete property', async () => {
                await SchemaManager.deleteProperty(
                    schema._id as string,
                    String(schema.schemaProperties[0])
                );
                const propertyList = await PropertyModel.find().exec();
                expect(propertyList.length).to.equal(0);
            });
        });

        context('Invalid schema id', () => {
            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await SchemaManager.deleteProperty(
                        INVALID_ID,
                        String(schema.schemaProperties[0])
                    );
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof InvalidId).to.be.true;
                }
            });
        });

        context('Invalid property id', () => {
            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await SchemaManager.deleteProperty(
                        schema._id as string,
                        INVALID_ID
                    );
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
                    await SchemaManager.deleteProperty(
                        ID_NOT_EXIST,
                        String(schema.schemaProperties[0])
                    );
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof SchemaNotFoundError).to.be.true;
                }
            });
        });

        context('Property that not exist', () => {
            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await SchemaManager.deleteProperty(
                        schema._id as string,
                        ID_NOT_EXIST
                    );
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof PropertyNotFoundError).to.be.true;
                }
            });
        });

        context('Property that not exist in schema', () => {
            let property: IProperty;

            beforeEach(async () => {
                property = await PropertyManager.create({ ...propertyExample }) as IProperty;
            });

            afterEach(async () => {
                await PropertyManager.deleteById(property._id as string);
            });

            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await SchemaManager.deleteProperty(
                        schema._id as string,
                        property._id as string
                    );
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof PropertyNotInSchemaError).to.be.true;
                }
            });
        });
    });

    describe('Update schema', () => {
        let schema: ISchema;
        const NEW_NAME: string = 'new';
        const newSchema: ISchema = { ...schemaExample, schemaName: NEW_NAME };;

        beforeEach(async () => {
            schema = await SchemaManager.create({ ...schemaExample }, []) as ISchema;
        });

        afterEach(async () => {
            await SchemaModel.deleteMany({}).exec();
        });

        context('Valid id', () => {
            it('Should update schema', async () => {
                await SchemaManager.updateById(
                    schema._id as string,
                    newSchema
                ) as ISchema;
                const res = await SchemaManager.getById(schema._id as string);

                expect(res).to.exist;
                expect(res).to.have.property('schemaName', NEW_NAME);
            });
        });

        context('Invalid schema id', () => {
            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await SchemaManager.updateById(
                        INVALID_ID,
                        newSchema
                    ) as ISchema;
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
                    await SchemaManager.updateById(
                        ID_NOT_EXIST,
                        newSchema
                    ) as ISchema;
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof SchemaNotFoundError).to.be.true;
                }
            });
        });

        context('Invalid property field value', () => {
            it('Should throw an invalid value error', async () => {
                let functionError: Object = {};
                try {
                    const invalidProperty: IProperty = {
                        ...propertyExample,
                        propertyType: 'f'
                    }, schemaWithInvalidProp: ISchema = {
                        ...newSchema,
                        schemaProperties: [invalidProperty]
                    }
                    await SchemaManager.updateById(
                        schema._id as string,
                        schemaWithInvalidProp
                    ) as ISchema;
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof InvalidValueInProperty).to.be.true;
                }
            });
        });
    });
});