export const numberValidationSchema = {
  "type": "object",
  "properties": {
    "biggerThan": { "type": "number" },
    "smallerThan": { "type": "number" },
    "equalsTo": { "type": "number" },
    "differFrom": {
      "type": "array",
      "items": { "type": "number" }
    },
    "digitsAmount": { "type": "number" },
    "isEven": { "type": "boolean" },
    "isPositive": { "type": "number" },
    "isPrime": { "type": "number" },
    "isDecimal": { "type": "number" },
  },
};
