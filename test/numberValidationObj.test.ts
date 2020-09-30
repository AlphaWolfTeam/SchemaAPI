import chai from "chai";
import mongoose from "mongoose";
import config from "../src/config/index";
import IProperty from "../src/property/property.interface";
import { propertyNumberExample } from "./dataExamples";
import PropertyManager from "../src/property/property.manager";
import {
  DefaultValueIsNotValidError,
  EnumValuesAreNotValidError,
  InvalidValueInPropertyError,
} from "../src/utils/errors/user";

const { expect } = chai;
const { mongo } = config;
describe("Number validation object", () => {
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

  context("Property values validation", () => {
    context("BiggerThan", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyNumberExample,
              validation: { biggerThan: 1 },
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
              ...propertyNumberExample,
              validation: { biggerThan: 1 },
              defaultValue: undefined,
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

    context("SmallerThan", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyNumberExample,
              validation: { smallerThan: 1 },
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
              ...propertyNumberExample,
              validation: { smallerThan: 1 },
              defaultValue: undefined,
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
              ...propertyNumberExample,
              validation: { equalsTo: 2 },
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
              ...propertyNumberExample,
              validation: { equalsTo: 2 },
              defaultValue: undefined,
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
              ...propertyNumberExample,
              validation: { differFrom: [1, 5] },
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
              ...propertyNumberExample,
              validation: { differFrom: [1, 5] },
              defaultValue: undefined,
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

    context("MinDigitsAmount", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyNumberExample,
              validation: { minDigitsAmount: 2 },
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
              ...propertyNumberExample,
              validation: { minDigitsAmount: 2 },
              defaultValue: undefined,
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

    context("MaxDigitsAmount", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyNumberExample,
              validation: { maxDigitsAmount: 0 },
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
              ...propertyNumberExample,
              validation: { maxDigitsAmount: 0 },
              defaultValue: undefined,
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

    context("DigitsAmount", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyNumberExample,
              validation: { digitsAmount: 3 },
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
              ...propertyNumberExample,
              validation: { digitsAmount: 3 },
              defaultValue: undefined,
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

    context("IsEven", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyNumberExample,
              validation: { isEven: true },
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
              ...propertyNumberExample,
              validation: { isEven: true },
              defaultValue: undefined,
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

    context("IsPositive", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          console.log({
            ...propertyNumberExample,
            validation: { isPositive: false },
            enum: undefined,
          })
          try {
            const invalidProperty: IProperty = {
              ...propertyNumberExample,
              validation: { isPositive: false },
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
              ...propertyNumberExample,
              validation: { isPositive: false },
              defaultValue: undefined,
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

    context("IsPrime", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyNumberExample,
              validation: { isPrime: true },
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
              ...propertyNumberExample,
              validation: { isPrime: false },
              defaultValue: undefined,
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

    context("IsDecimal", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyNumberExample,
              validation: { isDecimal: true },
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
              ...propertyNumberExample,
              validation: { isDecimal: true },
              defaultValue: undefined,
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
    it("Should throw an InvalidValueInPropertyError", async () => {
      let functionError: Object = {};
      try {
        const invalidProperty: IProperty = {
          ...propertyNumberExample,
          validation: { biggerThan: "hello" },
        };
        (await PropertyManager.create(invalidProperty)) as IProperty;
      } catch (error) {
        functionError = error;
      } finally {
        expect(functionError instanceof InvalidValueInPropertyError).to.be.true;
      }
    });
  });
});
