import {
    InvalidIdError,
    PropertyNotFoundError
} from '../src/utils/errors/user';
import chai from 'chai';
import mongoose from 'mongoose';
import config from '../src/config/index';
import PropertyModel from '../src/property/property.model';
import PropertyManager from '../src/property/property.manager';
import IProperty from '../src/property/property.interface';
import { propertyNumberExample, ID_NOT_EXIST, INVALID_ID } from './dataExamples';

const { expect } = chai;
const { mongo } = config;

describe('Property Manager', () => {
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
    describe('Get by id', () => {
        let property: IProperty;

        beforeEach(async () => {
            property = await PropertyManager.create({ ...propertyNumberExample }) as IProperty;
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
            });
        });

        context('Invalid id', () => {
            it('Should throw an InvalidIdError', async () => {
                let functionError: Object = {};
                try {
                    await PropertyManager.getById(INVALID_ID);
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof InvalidIdError).to.be.true;
                }
            });
        });

        context('Property that not exist', () => {
            it('Should throw an PropertyNotFoundError', async () => {
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
            property = await PropertyManager.create({ ...propertyNumberExample }) as IProperty;
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
            it('Should throw an InvalidIdError', async () => {
                let functionError: Object = {};
                try {
                    await PropertyManager.deleteById(INVALID_ID);
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof InvalidIdError).to.be.true;
                }
            });
        });

        context('Property that not exist', () => {
            it('Should throw an PropertyNotFoundError', async () => {
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

    describe('Update property', () => {
        let property: IProperty;
        const NEW_NAME: string = 'new';
        const newProperty: IProperty = { ...propertyNumberExample, propertyName: NEW_NAME };;

        beforeEach(async () => {
            property = await PropertyManager.create({ ...propertyNumberExample }) as IProperty;
        });

        afterEach(async () => {
            await PropertyModel.deleteMany({}).exec();
        });

        context('Valid id', () => {
            it('Should update property', async () => {
                await PropertyManager.updateById(
                    property._id as string,
                    newProperty
                ) as IProperty;
                const res = await PropertyManager.getById(property._id as string);

                expect(res).to.exist;
                expect(res).to.have.property('propertyName', NEW_NAME);
            });
        });

        context('Invalid property id', () => {
            it('Should throw an InvalidIdError', async () => {
                let functionError: Object = {};
                try {
                    await PropertyManager.updateById(
                        INVALID_ID,
                        newProperty
                    ) as IProperty;
                } catch (error) {
                    functionError = error;
                } finally {
                    expect(functionError instanceof InvalidIdError).to.be.true;
                }
            });
        });
    });
});