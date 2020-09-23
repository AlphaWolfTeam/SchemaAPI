export const dateValidationSchema = {
  "type": "object",
  "properties": {
    "before": {
      "type": "string",
      "format": "date"
    },
    "after": {
      "type": "string",
      "format": "date"
    },
    "equalsTo": {
      "type": "string",
      "format": "date"
    },
    "between": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "date"
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
  }
}