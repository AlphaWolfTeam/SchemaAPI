export const dateValidationSchema = {
  "type": "object",
  "properties": {
    "before": {
      "type": "string",
      "format": "date-time"
    },
    "after": {
      "type": "string",
      "format": "date-time"
    },
    "equalsTo": {
      "type": "string",
      "format": "date-time"
    },

    "differFrom": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "date-time"
      }
    },
    "between": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "date-time"
      }
    },
    "minDay": { "type": "number" },
    "maxDay": { "type": "number" },
    "specificDay": { "type": "number" },
    "dayBetweens": {
      "type": "array",
      "items": { "type": "number" }
    },
    "minMonth": { "type": "number" },
    "maxMonth": { "type": "number" },
    "specificMonth": { "type": "number" },
    "monthBetweens": {
      "type": "array",
      "items": { "type": "number" }
    },
    "minYear": { "type": "number" },
    "maxYear": { "type": "number" },
    "specificYear": { "type": "number" },
    "yearBetweens": {
      "type": "array",
      "items": { "type": "number" }
    },
  },
  "additionalProperties": false
}