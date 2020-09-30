import chai from "chai";
import mongoose from "mongoose";
import config from "../src/config/index";
import IProperty from "../src/property/property.interface";
import {
  propertyStringExample,
} from "./dataExamples";
import PropertyManager from "../src/property/property.manager";
import {
  DefaultValueIsNotValidError,
  EnumValuesAreNotValidError,
  InvalidValueInPropertyError,
} from "../src/utils/errors/user";

const { expect } = chai;
const { mongo } = config;
describe("String validation object", () => {
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
    context("LongerThan", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyStringExample,
              validation:{longerThan:8},
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
              ...propertyStringExample, 
              defaultValue: undefined,
              validation:{longerThan:8},
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

    context("ShorterThan", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyStringExample,
              validation:{shorterThan:1},
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
              ...propertyStringExample, 
              defaultValue: undefined,
              validation:{shorterThan:1},
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

    context("Length", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyStringExample,
              validation:{length:8},
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
              ...propertyStringExample, 
              defaultValue: undefined,
              validation:{length:8},
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
              ...propertyStringExample,
              validation:{equalsTo:"b"},
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
              ...propertyStringExample, 
              defaultValue: undefined,
              validation:{equalsTo:"b"},
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
              ...propertyStringExample,
              validation:{differFrom:['hello']},
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
              ...propertyStringExample, 
              defaultValue: undefined,
              validation:{differFrom:['hello']},
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

    context("StartsWith", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyStringExample,
              validation:{startsWith:'b'},
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
              ...propertyStringExample, 
              defaultValue: undefined,
              validation:{startsWith:'b'},
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

    context("EndsWith", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyStringExample,
              validation:{endsWith:"b"},
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
              ...propertyStringExample, 
              defaultValue: undefined,
              validation:{endsWith:"b"},
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

    context("Includes", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyStringExample,
              validation:{includes:['b','c']},
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
              ...propertyStringExample, 
              defaultValue: undefined,
              validation:{includes:['b','c']},
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

    context("MustNotIncludeChars", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyStringExample,
              validation:{mustNotIncludeChars:['h', 'e']},
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
              ...propertyStringExample, 
              defaultValue: undefined,
              validation:{mustNotIncludeChars:['h', 'e']},
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

    context("IsPhoneNumber", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyStringExample,
              validation:{isPhoneNumber: true},
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
              ...propertyStringExample, 
              defaultValue: undefined,
              validation:{isPhoneNumber: true},
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

    context("IsEmail", () => {
      context("Invalid default value ", () => {
        it("Should throw an DefaultValueIsNotValidError", async () => {
          let functionError: Object = {};
          try {
            const invalidProperty: IProperty = {
              ...propertyStringExample,
              validation:{isEmail: true},
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
              ...propertyStringExample, 
              defaultValue: undefined,
              validation:{isEmail: true},
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
            ...propertyStringExample,
            validation: { length: "hello" },
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
