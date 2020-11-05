import chai from "chai";
import mongoose from "mongoose";
import config from "../src/config/index";
import PropertyModel from "../src/property/property.model";
import PropertyManager from "../src/property/property.manager";
import IProperty from "../src/property/property.interface";
import {
  propertyNumberExample,
  propertyStringExample,
  propertyDateExample,
  propertyBooleanExample,
  propertyObjectIdExample,
  schemaExample,
  INVALID_REF_NAME,
} from "./dataExamples";
import {
  InvalidValueInPropertyError,
  PropertyRefExistError,
  PropertyRefNotExistError,
  SchemaNotFoundError,
} from "../src/utils/errors/user";
import SchemaManager from "../src/schema/schema.manager";
import ISchema from "../src/schema/schema.interface";
import SchemaModel from "../src/schema/schema.model";
// import { initRabbit } from "../src/utils/rabbitmq/rabbit";

const { expect } = chai;
const { test } = config;

describe("Property Type Manager", () => {
  before(async () => {
    // await initRabbit(
    //   test.rabbit.uri,
    //   test.rabbit.retryOptions,
    //   test.rabbit.queueName
    // );
    await mongoose.connect(test.mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe("Create", () => {
    afterEach(async () => {
      await PropertyModel.deleteMany({}).exec();
    });
    context("Valid types", () => {
      context("Valid number type", () => {
        it("Should create property", async () => {
          const createdProperty = (await PropertyManager.create(
            propertyNumberExample
          )) as IProperty;
          expect(createdProperty).to.exist;
          expect(createdProperty).to.have.property("_id");
          expect(createdProperty).to.have.property(
            "propertyName",
            propertyNumberExample.propertyName
          );
          expect(createdProperty).to.have.property(
            "propertyType",
            propertyNumberExample.propertyType
          );
          expect(createdProperty).to.have.property(
            "defaultValue",
            propertyNumberExample.defaultValue
          );
          expect(createdProperty).to.have.property(
            "propertyRef",
            propertyNumberExample.propertyRef
          );
          expect(JSON.stringify(createdProperty.validation)).to.equals(
            JSON.stringify(propertyNumberExample.validation)
          );
          expect(JSON.stringify(createdProperty.enum)).to.equals(
            JSON.stringify(propertyNumberExample.enum)
          );
          expect(createdProperty).to.have.property(
            "isUnique",
            propertyNumberExample.isUnique
          );
          expect(createdProperty).to.have.property(
            "index",
            propertyNumberExample.index
          );
          expect(createdProperty).to.have.property(
            "required",
            propertyNumberExample.required
          );
        });
      });

      context("Valid string type", () => {
        it("Should create property", async () => {
          const createdProperty = (await PropertyManager.create(
            propertyStringExample
          )) as IProperty;

          expect(createdProperty).to.exist;
          expect(createdProperty).to.have.property("_id");
          expect(createdProperty).to.have.property(
            "propertyName",
            propertyStringExample.propertyName
          );
          expect(createdProperty).to.have.property(
            "propertyType",
            propertyStringExample.propertyType
          );
          expect(createdProperty).to.have.property(
            "defaultValue",
            propertyStringExample.defaultValue
          );
          expect(createdProperty).to.have.property(
            "propertyRef",
            propertyStringExample.propertyRef
          );
          expect(JSON.stringify(createdProperty.validation)).to.equals(
            JSON.stringify(propertyStringExample.validation)
          );
          expect(JSON.stringify(createdProperty.enum)).to.equals(
            JSON.stringify(propertyStringExample.enum)
          );
          expect(createdProperty).to.have.property(
            "isUnique",
            propertyStringExample.isUnique
          );
          expect(createdProperty).to.have.property(
            "index",
            propertyStringExample.index
          );
          expect(createdProperty).to.have.property(
            "required",
            propertyStringExample.required
          );
        });
      });

      context("Valid date type", () => {
        it("Should create property", async () => {
          const createdProperty = (await PropertyManager.create(
            propertyDateExample
          )) as IProperty;

          expect(createdProperty).to.exist;
          expect(createdProperty).to.have.property("_id");
          expect(createdProperty).to.have.property(
            "propertyName",
            propertyDateExample.propertyName
          );
          expect(createdProperty).to.have.property(
            "propertyType",
            propertyDateExample.propertyType
          );
          expect(createdProperty).to.have.property(
            "defaultValue",
            propertyDateExample.defaultValue
          );
          expect(createdProperty).to.have.property(
            "propertyRef",
            propertyDateExample.propertyRef
          );
          expect(JSON.stringify(createdProperty.validation)).to.equals(
            JSON.stringify(propertyDateExample.validation)
          );
          expect(JSON.stringify(createdProperty.enum)).to.equals(
            JSON.stringify(propertyDateExample.enum)
          );
          expect(createdProperty).to.have.property(
            "isUnique",
            propertyDateExample.isUnique
          );
          expect(createdProperty).to.have.property(
            "index",
            propertyDateExample.index
          );
          expect(createdProperty).to.have.property(
            "required",
            propertyDateExample.required
          );
        });
      });

      context("Valid boolean type", () => {
        it("Should create property", async () => {
          const createdProperty = (await PropertyManager.create(
            propertyBooleanExample
          )) as IProperty;

          expect(createdProperty).to.exist;
          expect(createdProperty).to.have.property("_id");
          expect(createdProperty).to.have.property(
            "propertyName",
            propertyBooleanExample.propertyName
          );
          expect(createdProperty).to.have.property(
            "propertyType",
            propertyBooleanExample.propertyType
          );
          expect(createdProperty).to.have.property(
            "defaultValue",
            propertyBooleanExample.defaultValue
          );
          expect(createdProperty).to.have.property(
            "propertyRef",
            propertyBooleanExample.propertyRef
          );
          expect(JSON.stringify(createdProperty.validation)).to.equals(
            JSON.stringify(propertyBooleanExample.validation)
          );
          expect(JSON.stringify(createdProperty.enum)).to.equals(
            JSON.stringify(propertyBooleanExample.enum)
          );
          expect(createdProperty).to.have.property(
            "isUnique",
            propertyBooleanExample.isUnique
          );
          expect(createdProperty).to.have.property(
            "index",
            propertyBooleanExample.index
          );
          expect(createdProperty).to.have.property(
            "required",
            propertyBooleanExample.required
          );
        });
      });

      context("Valid objectId type", () => {
        let schema: ISchema;
        beforeEach(async () => {
          schema = (await SchemaManager.create(schemaExample, [])) as ISchema;
        });
        afterEach(async () => {
          await SchemaModel.deleteMany({}).exec();
        });
        it("Should create property", async () => {
          const createdProperty = (await PropertyManager.create({
            ...propertyObjectIdExample,
            defaultValue: schema._id,
            enum: [schema._id],
            propertyRef: schemaExample.schemaName,
          })) as IProperty;

          expect(createdProperty).to.exist;
          expect(createdProperty).to.have.property("_id");
          expect(createdProperty).to.have.property(
            "propertyName",
            propertyObjectIdExample.propertyName
          );
          expect(createdProperty).to.have.property(
            "propertyType",
            propertyObjectIdExample.propertyType
          );
          expect(String(createdProperty.defaultValue)).to.be.equals(
            String(schema._id)
          );
          expect(createdProperty).to.have.property(
            "propertyRef",
            schemaExample.schemaName
          );
          expect(JSON.stringify(createdProperty.validation)).to.equals(
            JSON.stringify(propertyObjectIdExample.validation)
          );
          expect(JSON.stringify(createdProperty.enum)).to.equals(
            JSON.stringify([schema._id])
          );
          expect(createdProperty).to.have.property(
            "isUnique",
            propertyObjectIdExample.isUnique
          );
          expect(createdProperty).to.have.property(
            "index",
            propertyObjectIdExample.index
          );
          expect(createdProperty).to.have.property(
            "required",
            propertyObjectIdExample.required
          );
        });
      });
    });

    context("Invalid types", () => {
      context("Invalid field value", () => {
        it("Should throw an InvalidValueInPropertyError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyNumberExample,
              propertyType: "f",
            };
            (await PropertyManager.create(invalidProperty)) as IProperty;
          } catch (error) {
            functionError = error;
          } finally {
            expect(functionError instanceof InvalidValueInPropertyError).to.be
              .true;
          }
        });

        context("Invalid number-", () => {
          context("Invalid default value", () => {
            it("Should throw an InvalidValueInPropertyError", async () => {
              let functionError: Object = {};
              try {
                const invalidProperty: IProperty = {
                  ...propertyNumberExample,
                  defaultValue: "f",
                };
                (await PropertyManager.create(invalidProperty)) as IProperty;
              } catch (error) {
                functionError = error;
              } finally {
                expect(functionError instanceof InvalidValueInPropertyError).to
                  .be.true;
              }
            });
          });

          context("Invalid enum", () => {
            it("Should throw an InvalidValueInPropertyError", async () => {
              let functionError: Object = {};
              try {
                const invalidProperty: IProperty = {
                  ...propertyNumberExample,
                  enum: [2, 1, "g"],
                };
                (await PropertyManager.create(invalidProperty)) as IProperty;
              } catch (error) {
                functionError = error;
              } finally {
                expect(functionError instanceof InvalidValueInPropertyError).to
                  .be.true;
              }
            });
          });

          context("Property ref exist", () => {
            it("Should throw an PropertyRefExistError", async () => {
              let functionError: Object = {};
              try {
                const invalidProperty: IProperty = {
                  ...propertyNumberExample,
                  propertyRef: INVALID_REF_NAME,
                };
                (await PropertyManager.create(invalidProperty)) as IProperty;
              } catch (error) {
                functionError = error;
              } finally {
                expect(functionError instanceof PropertyRefExistError).to.be
                  .true;
              }
            });
          });
        });

        context("Invalid boolean-", () => {
          context("Invalid default value", () => {
            it("Should throw an InvalidValueInPropertyError", async () => {
              let functionError: Object = {};
              try {
                const invalidProperty: IProperty = {
                  ...propertyBooleanExample,
                  defaultValue: "g",
                };
                (await PropertyManager.create(invalidProperty)) as IProperty;
              } catch (error) {
                functionError = error;
              } finally {
                expect(functionError instanceof InvalidValueInPropertyError).to
                  .be.true;
              }
            });
          });
          context("Property ref exist", () => {
            it("Should throw an PropertyRefExistError", async () => {
              let functionError: Object = {};
              try {
                const invalidProperty: IProperty = {
                  ...propertyBooleanExample,
                  propertyRef: INVALID_REF_NAME,
                };
                (await PropertyManager.create(invalidProperty)) as IProperty;
              } catch (error) {
                functionError = error;
              } finally {
                expect(functionError instanceof PropertyRefExistError).to.be
                  .true;
              }
            });
          });
        });

        context("Invalid date-", () => {
          context("Invalid default value", () => {
            it("Should throw an InvalidValueInPropertyError", async () => {
              let functionError: Object = {};
              try {
                const invalidProperty: IProperty = {
                  ...propertyDateExample,
                  defaultValue: "g",
                };
                (await PropertyManager.create(invalidProperty)) as IProperty;
              } catch (error) {
                functionError = error;
              } finally {
                expect(functionError instanceof InvalidValueInPropertyError).to
                  .be.true;
              }
            });
          });
          context("Invalid enum", () => {
            it("Should throw an InvalidValueInPropertyError", async () => {
              let functionError: Object = {};
              try {
                const invalidProperty: IProperty = {
                  ...propertyDateExample,
                  enum: [new Date("2013-10-01T00:00:00.000Z"), "g"],
                };
                (await PropertyManager.create(invalidProperty)) as IProperty;
              } catch (error) {
                functionError = error;
              } finally {
                expect(functionError instanceof InvalidValueInPropertyError).to
                  .be.true;
              }
            });
          });
          context("Property ref exist", () => {
            it("Should throw an PropertyRefExistError", async () => {
              let functionError: Object = {};
              try {
                const invalidProperty: IProperty = {
                  ...propertyDateExample,
                  propertyRef: INVALID_REF_NAME,
                };
                (await PropertyManager.create(invalidProperty)) as IProperty;
              } catch (error) {
                functionError = error;
              } finally {
                expect(functionError instanceof PropertyRefExistError).to.be
                  .true;
              }
            });
          });
        });

        context("Invalid objectId-", () => {
          context("Invalid property ref", () => {
            it("Should throw an PropertyRefNotExistError", async () => {
              let functionError: Object = {};
              try {
                const invalidProperty: IProperty = {
                  ...propertyObjectIdExample,
                };
                (await PropertyManager.create(invalidProperty)) as IProperty;
              } catch (error) {
                functionError = error;
              } finally {
                expect(functionError instanceof PropertyRefNotExistError).to.be
                  .true;
              }
            });
            it("Should throw an SchemaNotFoundError", async () => {
              let functionError: Object = {};
              try {
                const invalidProperty: IProperty = {
                  ...propertyObjectIdExample,
                  propertyRef: INVALID_REF_NAME,
                };
                (await PropertyManager.create(invalidProperty)) as IProperty;
              } catch (error) {
                functionError = error;
              } finally {
                expect(functionError instanceof SchemaNotFoundError).to.be.true;
              }
            });
          });
        });
      });

      context("Default value not exist in enum", () => {
        it("Should throw an InvalidValueInPropertyError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyNumberExample,
              defaultValue: "5",
              enum: [1, 2, 3],
            };
            (await PropertyManager.create(invalidProperty)) as IProperty;
          } catch (error) {
            functionError = error;
          } finally {
            expect(functionError instanceof InvalidValueInPropertyError).to.be
              .true;
          }
        });
      });

      context("Invalid validation objects", () => {
        context("Boolean validation", () => {
          it("Should throw an InvalidValueInPropertyError", async () => {
            let functionError: Object = {};
            try {
              const invalidProperty: IProperty = {
                ...propertyBooleanExample,
                validation: { biggerThan: "hello" },
              };
              (await PropertyManager.create(invalidProperty)) as IProperty;
            } catch (error) {
              functionError = error;
            } finally {
              expect(functionError instanceof InvalidValueInPropertyError).to.be
                .true;
            }
          });
        });

        context("ObjectId validation", () => {
          let schema: ISchema;
          beforeEach(async () => {
            schema = (await SchemaManager.create(schemaExample, [])) as ISchema;
          });
          afterEach(async () => {
            await SchemaModel.deleteMany({}).exec();
          });
          it("Should throw an InvalidValueInPropertyError", async () => {
            let functionError: Object = {};
            try {
              const invalidProperty: IProperty = {
                ...propertyObjectIdExample,
                defaultValue: schema._id,
                enum: [schema._id],
                validation: { biggerThan: "hello" },
              };
              (await PropertyManager.create(invalidProperty)) as IProperty;
            } catch (error) {
              functionError = error;
            } finally {
              expect(functionError instanceof InvalidValueInPropertyError).to.be
                .true;
            }
          });
        });
      });
    });
  });
});
