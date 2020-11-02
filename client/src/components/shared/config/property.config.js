const propertyConfig = {
  propertyFields: [
    {
      name: "propertyName",
      displayName: "Name",
      type: "String",
      required: true,
    },
    {
      name: "propertyType",
      displayName: "Type",
      type: "Array",
      options: ["String", "Number", "Boolean", "Date", "ObjectId"],
      required: true,
    },
    {
      name: "defaultValue",
      displayName: "Default Value",
      type: "String",
      required: false,
    },
    { name: "enum", displayName: "Enum", type: "Enum", required: false },
    {
      name: "isUnique",
      displayName: "Unique",
      type: "Boolean",
      required: true,
    },
    {
      name: "index",
      displayName: "Index",
      type: "Boolean",
      required: false,
    },
    {
      name: "required",
      displayName: "Required",
      type: "Boolean",
      required: false,
    },
  ],
  validationSchemas: {
    Number: [
      {
        name: "biggerThan",
        displayName: "Bigger Than",
        type: "Number",
      },
      {
        name: "smallerThan",
        displayName: "Smaller Than",
        type: "Number",
      },
      {
        name: "equalsTo",
        displayName: "Equals To",
        type: "Number",
      },
      {
        name: "minDigitsAmount",
        displayName: "Min Digits Amount",
        type: "Number",
      },
      {
        name: "maxDigitsAmount",
        displayName: "Max Digits Amount",
        type: "Number",
      },
      {
        name: "digitsAmount",
        displayName: "Digits Amount",
        type: "Number",
      },
      {
        name: "differFrom",
        displayName: "Differ From",
        type: "Array",
        items: { type: "Number" },
      },
      {
        name: "isEven",
        displayName: "Even",
        type: "Boolean",
      },
      {
        name: "isPositive",
        displayName: "Positive",
        type: "Boolean",
      },
      {
        name: "isPrime",
        displayName: "Prime",
        type: "Boolean",
      },
      {
        name: "isDecimal",
        displayName: "Decimal",
        type: "Boolean",
      },
    ],
    String: [
      {
        name: "longerThan",
        displayName: "Longer Than",
        type: "Number",
      },
      {
        name: "shorterThan",
        displayName: "Shorter Than",
        type: "Number",
      },
      {
        name: "length",
        displayName: "Length",
        type: "Number",
      },
      {
        name: "equalsTo",
        displayName: "Equals To",
        type: "String",
      },
      {
        name: "startsWith",
        displayName: "Starts With",
        type: "String",
      },
      {
        name: "endsWith",
        displayName: "Ends With",
        type: "String",
      },
      {
        name: "differFrom",
        displayName: "Differ From",
        type: "Array",
        items: { type: "String" },
      },
      {
        name: "includes",
        displayName: "Includes",
        type: "Array",
        items: { type: "String" },
      },
      {
        name: "mustNotInclude",
        displayName: "Must Not Include",
        type: "Array",
        items: { type: "String" },
      },
      {
        name: "isPhoneNumber",
        displayName: "Phone Number",
        type: "Boolean",
      },
      {
        name: "isEmail",
        displayName: "Email",
        type: "Boolean",
      },
    ],
    Date: [
      {
        name: "before",
        displayName: "Before",
        type: "String",
        format: "Date",
      },
      {
        name: "after",
        displayName: "After",
        type: "String",
        format: "Date",
      },
      {
        name: "equalsTo",
        displayName: "Equals To",
        type: "String",
        format: "Date",
      },
      {
        name: "differFrom",
        displayName: "Differ From",
        type: "Array",
        items: { type: "String", format: "Date" },
      },
    ],
  },
};

export default propertyConfig;
