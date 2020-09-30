import moment from "moment";

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

export const isDateValueValid = (date: Date, validateObj: Object): boolean => {
  if (validateObj["before"] &&
    (date >= validateObj["before"] || !moment(validateObj["before"], "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").isValid())) {
    return false;
  }

  if (validateObj["after"] &&
    (date <= validateObj["after"] || !moment(validateObj["after"], "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").isValid())) {
    return false;
  }

  if (validateObj["before"] && validateObj["after"] && validateObj["before"] <= validateObj["after"]) {
    return false;
  }

  if (validateObj["equalsTo"] &&
    (date !== validateObj["equalsTo"] || !moment(validateObj["equalsTo"], "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").isValid())) {
    return false;
  }

  if (validateObj["differFrom"]) {
    for (let i = 0; i < validateObj["differFrom"].length; i++) {
      if (date === validateObj["differFrom"][i] ||
        !moment(validateObj["differFrom"][i], "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").isValid()) {
        return false;
      }
    }
  }


  return true;
};
