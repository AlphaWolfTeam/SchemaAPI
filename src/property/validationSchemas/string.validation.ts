export const stringValidationSchema = {
  "type": "object",
  "properties": {
    "longerThan": { "type": "number" },
    "shorterThan": { "type": "number" },
    "length": { "type": "number" },
    "equalsTo": { "type": "string" },
    "differFrom": {
      "type": "array",
      "items": { "type": "string" }
    },
    "startsWith": { "type": "string" },
    "endsWith": { "type": "string" },
    "includes": { "type": "string" },
    "pattern": { 
      "type": "string", 
      "format":"regex" 
    },
    "requiredChars": {
      "type": "array",
      "items": { "type": "string" }
    },
    "mustNotIncludeChars": {
      "type": "array",
      "items": { "type": "string" }
    },
  },
  "additionalProperties": false
};