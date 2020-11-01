import {
  InvalidIdError,
  PropertyNotFoundError,
} from "../src/utils/errors/user";
import chai from "chai";
import mongoose from "mongoose";
import config from "../src/config/index";
import PropertyModel from "../src/property/property.model";
import PropertyManager from "../src/property/property.manager";
import IProperty from "../src/property/property.interface";
import {
  propertyNumberExample,
  ID_NOT_EXIST,
  INVALID_ID,
  schemaExample,
  propertyObjectIdExample,
} from "./dataExamples";
import ISchema from "../src/schema/schema.interface";
import SchemaManager from "../src/schema/schema.manager";
import SchemaModel from "../src/schema/schema.model";

const { expect } = chai;
const { mongo } = config;

describe("Property Manager", () => {
  before(async () => {
    await mongoose.connect(mongo.testUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
  describe("Get by id", () => {
    let property: IProperty;

    beforeEach(async () => {
      property = (await PropertyManager.create({
        ...propertyNumberExample,
      })) as IProperty;
    });

    afterEach(async () => {
      await PropertyModel.deleteMany({}).exec();
    });

    context("valid id", () => {
      it("Should return property", async () => {
        const validProperty = (await PropertyManager.getById(
          property._id as string
        )) as IProperty;

        expect(validProperty).to.exist;
        expect(validProperty).to.have.property("_id");
        expect(validProperty).to.have.property(
          "propertyName",
          property.propertyName
        );
        expect(validProperty).to.have.property(
          "propertyType",
          property.propertyType
        );
        expect(validProperty).to.have.property(
          "defaultValue",
          property.defaultValue
        );
        expect(validProperty).to.have.property(
          "propertyRef",
          property.propertyRef
        );
        expect(JSON.stringify(validProperty.enum)).to.equals(
          JSON.stringify(property.enum)
        );
        expect(validProperty).to.have.property("isUnique", property.isUnique);
        expect(validProperty).to.have.property("index", property.index);
        expect(validProperty).to.have.property("required", property.required);
        expect(JSON.stringify(validProperty.createdAt)).to.equals(
          JSON.stringify(property.createdAt)
        );
        expect(JSON.stringify(validProperty.updatedAt)).to.equals(
          JSON.stringify(property.updatedAt)
        );
      });
    });

    context("Invalid id", () => {
      it("Should throw an InvalidIdError", async () => {
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

    context("Property not found", () => {
      it("Should throw an PropertyNotFoundError", async () => {
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

  describe("Delete by id", () => {
    let property: IProperty;

    beforeEach(async () => {
      property = (await PropertyManager.create(
        propertyNumberExample
      )) as IProperty;
    });

    afterEach(async () => {
      await PropertyModel.deleteMany({}).exec();
    });

    context("Valid id", () => {
      it("Should delete property", async () => {
        await PropertyManager.deleteById(property._id as string);
        const propertiesList = await PropertyModel.find().exec();
        expect(propertiesList.length).to.equal(0);
      });
    });

    context("Invalid id", () => {
      it("Should throw an InvalidIdError", async () => {
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

    context("Property not found", () => {
      it("Should throw an PropertyNotFoundError", async () => {
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

  describe("Update property", () => {
    let property: IProperty;
    const NEW_NAME: string = "new";
    const newProperty: IProperty = {
      ...propertyNumberExample,
      propertyName: NEW_NAME,
    };

    beforeEach(async () => {
      property = (await PropertyManager.create(
        propertyNumberExample
      )) as IProperty;
    });

    afterEach(async () => {
      await PropertyModel.deleteMany({}).exec();
    });

    context("Valid id", () => {
      it("Should update property", async () => {
        (await PropertyManager.updateById(
          property._id as string,
          newProperty
        )) as IProperty;
        const validProperty = await PropertyManager.getById(
          property._id as string
        );

        expect(validProperty).to.exist;
        expect(validProperty).to.have.property("propertyName", NEW_NAME);
      });
    });

    context("Invalid property id", () => {
      it("Should throw an InvalidIdError", async () => {
        let functionError: Object = {};
        try {
          (await PropertyManager.updateById(
            INVALID_ID,
            newProperty
          )) as IProperty;
        } catch (error) {
          functionError = error;
        } finally {
          expect(functionError instanceof InvalidIdError).to.be.true;
        }
      });
    });
  });

  describe("Update property ref", () => {
    let property: IProperty;
    let firstSchema: ISchema;
    let secondSchema: ISchema;
    const SECOND_SCHEMA_NAME: string = "second name";

    beforeEach(async () => {
      firstSchema = (await SchemaManager.create(schemaExample, [])) as ISchema;
      secondSchema = (await SchemaManager.create(
        { ...schemaExample, schemaName: SECOND_SCHEMA_NAME },
        []
      )) as ISchema;
      property = (await PropertyManager.create({
        ...propertyObjectIdExample,
        propertyRef: firstSchema.schemaName,
      })) as IProperty;
    });

    afterEach(async () => {
      await PropertyModel.deleteMany({}).exec();
      await SchemaModel.deleteMany({}).exec();
    });

    it("Should update property ref", async () => {
      await PropertyManager.updatePropertyRef(
        firstSchema.schemaName,
        secondSchema.schemaName
      );
      const updatedProperty = await PropertyManager.getById(
        property._id as string
      );

      expect(updatedProperty).to.exist;
      expect(updatedProperty).to.have.property(
        "propertyRef",
        secondSchema.schemaName
      );
    });
  });
});
