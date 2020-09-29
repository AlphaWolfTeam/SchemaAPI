export const dateValidationSchema = {
  type: "object",
  properties: {
    before: {
      type: "string",
      format: "date-time",
    },
    after: {
      type: "string",
      format: "date-time",
    },
    equalsTo: {
      type: "string",
      format: "date-time",
    },
    differFrom: {
      type: "array",
      items: {
        type: "string",
        format: "date-time",
      },
    },
  },
  additionalProperties: false,
};

export const isDateValueValid = (date: Date ,validateObj: Object): boolean => {
  if (validateObj["before"] && date >= validateObj["before"]) {
    return false;
  }

  if (validateObj["after"] && date <= validateObj["after"]) {
    return false;
  }

  if (validateObj["before"] && validateObj["after"] && validateObj["before"]<=  validateObj["after"] ) {
    return false;
  }

  if (validateObj["equalsTo"] && date !== validateObj["equalsTo"]) {
    return false;
  }

  if (validateObj["differFrom"]) {
    for (let i = 0; i < validateObj["differFrom"].length; i++) {
      if (date === validateObj["differFrom"][i]) {
        return false;
      }
    }
  }

 
  return true;
};
