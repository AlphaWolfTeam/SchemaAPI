export const numberValidationSchema = {
  type: "object",
  properties: {
    biggerThan: { type: "number" },
    smallerThan: { type: "number" },
    equalsTo: { type: "number" },
    differFrom: {
      type: "array",
      items: { type: "number" },
    },
    minDigitsAmount: { type: "number" },
    maxDigitsAmount: { type: "number" },
    digitsAmount: { type: "number" },
    isEven: { type: "boolean" },
    isPositive: { type: "boolean" },
    isPrime: { type: "boolean" },
    isDecimal: { type: "boolean" },
  },
  additionalProperties: false,
};

export const isNumberValueValid = (
  number: number,
  validateObj: Object
): boolean => {
  if (validateObj["biggerThan"] && number <= validateObj["biggerThan"]) {
    return false;
  }

  if (validateObj["smallerThan"] && number >= validateObj["smallerThan"]) {
    return false;
  }

  if (
    validateObj["biggerThan"] &&
    validateObj["smallerThan"] &&
    validateObj["smallerThan"] <= validateObj["biggerThan"]
  ) {
    return false;
  }

  if (validateObj["equalsTo"] && number !== validateObj["equalsTo"]) {
    return false;
  }

  if (validateObj["differFrom"]) {
    for (let i = 0; i < validateObj["differFrom"].length; i++) {
      if (number === validateObj["differFrom"][i]) {
        return false;
      }
    }
  }

  if (
    validateObj["minDigitsAmount"] &&
    String(number).length >= validateObj["minDigitsAmount"]
  ) {
    return false;
  }

  if (
    validateObj["maxDigitsAmount"] &&
    String(number).length <= validateObj["maxDigitsAmount"]
  ) {
    return false;
  }

  if (
    validateObj["digitsAmount"] &&
    String(number).length !== validateObj["digitsAmount"]
  ) {
    return false;
  }

  if (
    validateObj["maxDigitsAmount"] &&
    validateObj["minDigitsAmount"] &&
    validateObj["minDigitsAmount"] >= validateObj["maxDigitsAmount"]
  ) {
    return false;
  }
  if (validateObj["isEven"] && number % 2 !== 0) {
    return false;
  }

  if (validateObj["isPositive"] && number < 0) {
    return false;
  }

  if (validateObj["isPrime"] && !isPrime(number)) {
    return false;
  }

  if (validateObj["isDecimal"] && number % 1 === 0) {
    return false;
  }

  return true;
};

const isPrime = (num: number): boolean => {
  for (let i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
};
