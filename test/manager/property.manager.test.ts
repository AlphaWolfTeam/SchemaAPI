import { InvalidId, PropertyNotFoundError, InvalidValue, SchemaNotFoundError } from './../../src/utils/errors/user';
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
            await PropertyModel.deleteMany({}).exec();
        });

        context('Valid types', () => {
            it('Should create property', async () => {
                const res = await PropertyManager.create(propertyExample) as IProperty;

                expect(res).to.exist;
                expect(res).to.have.property('_id');
                expect(res).to.have.property('propertyName', propertyExample.propertyName);
                expect(res).to.have.property('propertyType', propertyExample.propertyType);
                expect(res).to.have.property('defaultValue', propertyExample.defaultValue);
                expect(res).to.have.property('propertyRef', propertyExample.propertyRef);
                expect(JSON.stringify(res.enum)).to.equals(JSON.stringify(propertyExample.enum));
                expect(res).to.have.property('isUnique', propertyExample.isUnique);
                expect(res).to.have.property('index', propertyExample.index);
                expect(res).to.have.property('required', propertyExample.required);
                expect(JSON.stringify(res.createdAt)).to.equals(JSON.stringify(propertyExample.createdAt));
                expect(JSON.stringify(res.updatedAt)).to.equals(JSON.stringify(propertyExample.updatedAt));
                expect(res).to.have.property('permissions', propertyExample.permissions);
            });
        });

        context('Invalid types-', () => {
            context('Invalid number-', () => {
                context('Invalid default value', () => {
                    it('Should throw an invalid value error', async () => {
                        let functionError: Object = {};
                        try {
                            const invalidProperty: IProperty = {
                                ...propertyExample,
                                propertyType: "Number",
                                defaultValue: 'f',
                                enum: [2, 1, '1']
                            };
                            await PropertyManager.create(invalidProperty) as IProperty;
                        } catch (error) {
                            functionError = error;
                        } finally {
                            expect(functionError instanceof InvalidValue).to.be.true;
                        }
                    });
                });
                context('Invalid enum', () => {
                    it('Should throw an invalid value error', async () => {
                        let functionError: Object = {};
                        try {
                            const invalidProperty: IProperty = {
                                ...propertyExample,
                                propertyType: "Number",
                                defaultValue: '1',
                                enum: [2, 1, 'g']
                            };
                            await PropertyManager.create(invalidProperty) as IProperty;
                        } catch (error) {
                            functionError = error;
                        } finally {
                            expect(functionError instanceof InvalidValue).to.be.true;
                        }
                    });
                });
            });

            context('Invalid boolean-', () => {
                context('Invalid default value', () => {
                    it('Should throw an invalid value error', async () => {
                        let functionError: Object = {};
                        try {
                            const invalidProperty: IProperty = {
                                ...propertyExample,
                                propertyType: "Boolean",
                                defaultValue: 'g',
                                enum: [true, false, 'true']
                            };
                            await PropertyManager.create(invalidProperty) as IProperty;
                        } catch (error) {
                            functionError = error;
                        } finally {
                            expect(functionError instanceof InvalidValue).to.be.true;
                        }
                    });
                });
                context('Invalid enum', () => {
                    it('Should throw an invalid value error', async () => {
                        let functionError: Object = {};
                        try {
                            const invalidProperty: IProperty = {
                                ...propertyExample,
                                propertyType: "Boolean",
                                defaultValue: true,
                                enum: [true, false, 'g']
                            };
                            await PropertyManager.create(invalidProperty) as IProperty;
                        } catch (error) {
                            functionError = error;
                        } finally {
                            expect(functionError instanceof InvalidValue).to.be.true;
                        }
                    });
                });
            });
        });

        context('Invalid date-', () => {
            context('Invalid default value', () => {
                it('Should throw an invalid value error', async () => {
                    let functionError: Object = {};
                    try {
                        const invalidProperty: IProperty = {
                            ...propertyExample,
                            propertyType: "Date",
                            defaultValue: 'g',
                            enum: [new Date("2013-10-01T00:00:00.000Z")]
                        };
                        await PropertyManager.create(invalidProperty) as IProperty;
                    } catch (error) {
                        functionError = error;
                    } finally {
                        expect(functionError instanceof InvalidValue).to.be.true;
                    }
                });
            });
            context('Invalid enum', () => {
                it('Should throw an invalid value error', async () => {
                    let functionError: Object = {};
                    try {
                        const invalidProperty: IProperty = {
                            ...propertyExample,
                            propertyType: "Date",
                            defaultValue: new Date("2013-10-01T00:00:00.000Z"),
                            enum: [new Date("2013-10-01T00:00:00.000Z"), 'g']
                        };
                        await PropertyManager.create(invalidProperty) as IProperty;
                    } catch (error) {
                        functionError = error;
                    } finally {
                        expect(functionError instanceof InvalidValue).to.be.true;
                    }
                });
            });
        });

        context('Invalid objectId-', () => {
            let property: IProperty;
             
            beforeEach(async () => {
                property = await PropertyManager.create(propertyExample) as IProperty;
            });
    
            afterEach(async () => {
                await PropertyModel.deleteMany({}).exec();
            });

            context('Invalid default value', () => {
                it('Should throw an invalid value error', async () => {
                    let functionError: Object = {};
                    try {
                        const invalidProperty: IProperty = {
                            ...propertyExample,
                            propertyType: "ObjectId",
                            defaultValue: INVALID_ID,
                            enum: [property._id]
                        };
                        await PropertyManager.create(invalidProperty) as IProperty;
                    } catch (error) {
                        functionError = error;
                    } finally {
                        expect(functionError instanceof InvalidValue).to.be.true;
                    }
                });
                it('Should throw an schema not exist error', async () => {
                    let functionError: Object = {};
                    try {
                        const invalidProperty: IProperty = {
                            ...propertyExample,
                            propertyType: "ObjectId",
                            defaultValue: ID_NOT_EXIST,
                            enum: [property._id]
                        };
                        await PropertyManager.create(invalidProperty) as IProperty;
                    } catch (error) {
                        functionError = error;
                    } finally {
                        expect(functionError instanceof SchemaNotFoundError).to.be.true;
                    }
                });
            });
            context('Invalid enum', () => {
                it('Should throw an invalid value error', async () => {
                    let functionError: Object = {};
                    try {
                        const invalidProperty: IProperty = {
                            ...propertyExample,
                            propertyType: "ObjectId",
                            defaultValue: property._id,
                            enum: [INVALID_ID]
                        };
                        await PropertyManager.create(invalidProperty) as IProperty;
                    } catch (error) {
                        functionError = error;
                    } finally {
                        expect(functionError instanceof InvalidValue).to.be.true;
                    }
                });
                it('Should throw an schema not exist error', async () => {
                    let functionError: Object = {};
                    try {
                        const invalidProperty: IProperty = {
                            ...propertyExample,
                            propertyType: "ObjectId",
                            defaultValue: property._id,
                            enum: [ID_NOT_EXIST]
                        };
                        await PropertyManager.create(invalidProperty) as IProperty;
                    } catch (error) {
                        functionError = error;
                    } finally {
                        expect(functionError instanceof SchemaNotFoundError).to.be.true;
                    }
                });
            });
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

        context('valid id', () => {
            it('Should return property', async () => {
                const res = await PropertyManager.getById(property._id as string) as IProperty;

                expect(res).to.exist;
                expect(res).to.have.property('_id');
                expect(res).to.have.property('propertyName', property.propertyName);
                expect(res).to.have.property('propertyType', property.propertyType);
                expect(res).to.have.property('defaultValue', property.defaultValue);
                expect(res).to.have.property('propertyRef', property.propertyRef);
                expect(JSON.stringify(res.enum)).to.equals(JSON.stringify(property.enum));
                expect(res).to.have.property('isUnique', property.isUnique);
                expect(res).to.have.property('index', property.index);
                expect(res).to.have.property('required', property.required);
                expect(JSON.stringify(res.createdAt)).to.equals(JSON.stringify(property.createdAt));
                expect(JSON.stringify(res.updatedAt)).to.equals(JSON.stringify(property.updatedAt));
                expect(res).to.have.property('permissions', property.permissions);
            });
        });

        context('Invalid id', () => {
            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await PropertyManager.getById(INVALID_ID);
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof InvalidId).to.be.true;
                }
            });
        });

        context('Property that not exist', () => {
            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await PropertyManager.getById(ID_NOT_EXIST);
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof PropertyNotFoundError).to.be.true;
                }
            });
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

        context('Valid id', () => {
            it('Should delete property', async () => {
                await PropertyManager.deleteById(property._id as string);
                const propertiesList = await PropertyModel.find().exec();
                expect(propertiesList.length).to.equal(0);
            });
        });

        context('Invalid id', () => {
            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await PropertyManager.deleteById(INVALID_ID);
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof InvalidId).to.be.true;
                }
            });
        });

        context('Property that not exist', () => {
            it('Should throw an error', async () => {
                let functionError: Object = {};
                try {
                    await PropertyManager.deleteById(ID_NOT_EXIST);
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof PropertyNotFoundError).to.be.true;
                }
            });
        });
    });

});