export const stringValidationSchema = {
  type: "object",
  properties: {
    longerThan: { type: "number" },
    shorterThan: { type: "number" },
    length: { type: "number" },
    equalsTo: { type: "string" },
    differFrom: {
      type: "array",
      items: { type: "string" },
    },
    startsWith: { type: "string" },
    endsWith: { type: "string" },
    includes: { type: "string" },
    requiredChars: {
      type: "array",
      items: { type: "string" },
    },
    mustNotIncludeChars: {
      type: "array",
      items: { type: "string" },
    },
    isPhoneNumber: {
      type: "boolean",
    },  
    isEmail: {
      type: "boolean",
    },
  },
  additionalProperties: false,
};

export const isStringValueValid = (
  string: string,
  validateObj: Object
): boolean => {
  if (validateObj["longerThan"] && string.length <= validateObj["longerThan"]) {
    return false;
  }

  if (
    validateObj["shorterThan"] &&
    string.length >= validateObj["shorterThan"]
  ) {
    return false;
  }

  if (
    validateObj["shorterThan"] &&
    validateObj["longerThan"] &&
    validateObj["shorterThan"] <= validateObj["longerThan"]
  ) {
    return false;
  }

  if (validateObj["length"] && string.length !== validateObj["length"]) {
    return false;
  }

  if (validateObj["equalsTo"] && string !== validateObj["equalsTo"]) {
    return false;
  }

  if (validateObj["differFrom"]) {
    for (let i = 0; i < validateObj["differFrom"].length; i++) {
      if (string === validateObj["differFrom"][i]) {
        return false;
      }
    }
  }

  if (
    validateObj["startsWith"] &&
    !string.startsWith(validateObj["startsWith"])
  ) {
    return false;
  }

  if (validateObj["endsWith"] && !string.endsWith(validateObj["endsWith"])) {
    return false;
  }

  if (validateObj["includes"] && !string.includes(validateObj["includes"])) {
    return false;
  }

  if (validateObj["requiredChars"]) {
    for (let i = 0; i < validateObj["requiredChars"].length; i++) {
      if (!string.includes(validateObj["requiredChars"][i])) {
        return false;
      }
    }
  }

  if (validateObj["mustNotIncludeChars"]) {
    for (let i = 0; i < validateObj["mustNotIncludeChars"].length; i++) {
      if (string.includes(validateObj["mustNotIncludeChars"][i])) {
        return false;
      }
    }
  }

  if (validateObj["isPhoneNumber"] && !/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/.test(string)) {
    return false;
  }

  if (validateObj["isEmail"] && !/\S+@\S+\.\S+/.test(string)) {
    return false;
  }
  return true;
};

