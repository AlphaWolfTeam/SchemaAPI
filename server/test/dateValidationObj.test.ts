import chai from "chai";
import mongoose from "mongoose";
import config from "../src/config/index";
import IProperty from "../src/property/property.interface";
import { propertyDateExample } from "./dataExamples";
import PropertyManager from "../src/property/property.manager";
import {
  DefaultValueIsNotValidError,
  EnumValuesAreNotValidError,
  InvalidValueInPropertyError,
} from "../src/utils/errors/user";
import { initRabbit } from "../src/utils/rabbitmq/rabbit";

const { expect } = chai;
const { test } = config;
describe("Date validation object", () => {
  before(async () => {
    await initRabbit(
      test.rabbit.uri,
      test.rabbit.retryOptions,
      test.rabbit.queueName
    );
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

  context("Property values validation", () => {
    context("Before", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyDateExample,
              validation: { before: "2000-10-01T00:00:00.000Z" },
              enum: undefined,
            };
            (await PropertyManager.create(invalidProperty)) as IProperty;
          } catch (error) {
            functionError = error;
          } finally {
            expect(functionError instanceof DefaultValueIsNotValidError).to.be
              .true;
          }
        });
      });

      context("Invalid enum values ", () => {
        it("Should throw an EnumValuesAreNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyDateExample,
              defaultValue: undefined,
              validation: { before: "2000-10-01T00:00:00.000Z" },
            };
            (await PropertyManager.create(invalidProperty)) as IProperty;
          } catch (error) {
            functionError = error;
          } finally {
            expect(functionError instanceof EnumValuesAreNotValidError).to.be
              .true;
          }
        });
      });
    });

    context("After", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyDateExample,
              validation: { after: "2020-10-01T00:00:00.000Z" },
              enum: undefined,
            };
            (await PropertyManager.create(invalidProperty)) as IProperty;
          } catch (error) {
            functionError = error;
          } finally {
            expect(functionError instanceof DefaultValueIsNotValidError).to.be
              .true;
          }
        });
      });

      context("Invalid enum values ", () => {
        it("Should throw an EnumValuesAreNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyDateExample,
              defaultValue: undefined,
              validation: { after: "2020-10-01T00:00:00.000Z" },
            };
            (await PropertyManager.create(invalidProperty)) as IProperty;
          } catch (error) {
            functionError = error;
          } finally {
            expect(functionError instanceof EnumValuesAreNotValidError).to.be
              .true;
          }
        });
      });
    });

    context("EqualsTo", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyDateExample,
              validation: { equalsTo: "2000-10-01T00:00:00.000Z" },
              enum: undefined,
            };
            (await PropertyManager.create(invalidProperty)) as IProperty;
          } catch (error) {
            functionError = error;
          } finally {
            expect(functionError instanceof DefaultValueIsNotValidError).to.be
              .true;
          }
        });
      });

      context("Invalid enum values ", () => {
        it("Should throw an EnumValuesAreNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyDateExample,
              defaultValue: undefined,
              validation: { equalsTo: "2000-10-01T00:00:00.000Z" },
            };
            (await PropertyManager.create(invalidProperty)) as IProperty;
          } catch (error) {
            functionError = error;
          } finally {
            expect(functionError instanceof EnumValuesAreNotValidError).to.be
              .true;
          }
        });
      });
    });

    context("DifferFrom", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyDateExample,
              validation: { differFrom: ["2010-10-01T00:00:00.000Z"] },
              enum: undefined,
            };
            (await PropertyManager.create(invalidProperty)) as IProperty;
          } catch (error) {
            functionError = error;
          } finally {
            expect(functionError instanceof DefaultValueIsNotValidError).to.be
              .true;
          }
        });
      });

      context("Invalid enum values ", () => {
        it("Should throw an EnumValuesAreNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyDateExample,
              defaultValue: undefined,
              validation: { differFrom: ["2010-10-01T00:00:00.000Z"] },
            };
            (await PropertyManager.create(invalidProperty)) as IProperty;
          } catch (error) {
            functionError = error;
          } finally {
            expect(functionError instanceof EnumValuesAreNotValidError).to.be
              .true;
          }
        });
      });
    });
  });

  context("Invalid validation object", () => {
    context("Invalid object", () => {
      it("Should throw an InvalidValueInPropertyError", async () => {
        let functionError: Object = {};
        try {
          const invalidProperty: IProperty = {
            ...propertyDateExample,
            validation: { after: "hello" },
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

    context("Invalid date", () => {
      it("Should throw an InvalidValueInPropertyError", async () => {
        let functionError: Object = {};
        try {
          const invalidProperty: IProperty = {
            ...propertyDateExample,
            validation: { after: "2000-06-31T00:00:00.000Z" },
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
