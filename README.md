# schema-api

## HTTP Requests

| HTTP REQUEST | DEFINITION | PERMISSION |
| ----------- | --------------- | --------------- |
| GET /api/schema       | Get schemas list |7|
| GET /api/schema/[id]     |  Get schema by id | 8| 
| POST /api/schema       | Create schema |9|
| PUT /api/schema/[id]       | Update schema |10|
| DELETE /api/schema/[id]       | Delete schema by id |11|
| DELETE /api/schema/[id]/[propertyId]       | Delete property from schema by id |12|

## Schema Interface

    {
        schemaName: string,
        schemaProperties: IProperty[],
        createdAt: Date,
        updatedAt: Date
    }

## Property Interface

    {
        propertyName: string,
        propertyType: string,
        defaultValue?: [propertyType],
        propertyRef?: string,
        enum?: [propertyType][],
        isUnique: boolean,
        index?: boolean,
        required?: boolean,
        validation?: validationSchema,
        createdAt: Date,
        updatedAt: Date,
    }

## Property Type Options

* String
* Number
* Boolean
* Date
* ObjectId

## Validation Schemas

### Number Validation Schema

    {
    "type": "object",
    "properties": {
        "biggerThan": { "type": "number" },
        "smallerThan": { "type": "number" },
        "equalsTo": { "type": "number" },
        "differFrom": {
        "type": "array",
        "items": { "type": "number" }
        },
        "minDigitsAmount": { "type": "number" },
        "maxDigitsAmount": { "type": "number" },
        "digitsAmount": { "type": "number" },
        "isEven": { "type": "boolean" },
        "isPositive": { "type": "boolean" },
        "isPrime": { "type": "boolean" },
        "isDecimal": { "type": "boolean" },
    },
    "additionalProperties": false
    }

### String Validation Schema

    {
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
        "includes": {
        "type": "array",
        "items": { "type": "string" }
        },
        "mustNotInclude": {
        "type": "array",
        "items": { "type": "string" }
        },
        "isPhoneNumber" : { "type": "boolean" },
        "isEmail" : { "type": "boolean" }
    },
    "additionalProperties": false
    }

### Date Validation Schema

    {
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
        }
    },
    "additionalProperties": false
    }

## Request & Response Examples
  
### GET /api/schema

Response body:

    [
        {
            "schemaProperties": [
              {
                "enum": [],
                "_id": "5f60f0b30f0b504044b149bb",
                "propertyName": "property1",
                "propertyType": "Date",
                "isUnique": true,
                "index": true,
                "required": true,
                "validation": {
                    "after": "2013-06-30T00:00:00.000Z"
                },
                "createdAt": "2020-10-15T13:07:02.134Z",
                "updatedAt": "2020-10-15T13:07:02.134Z",
                "__v": 0
              }
            ],
            "_id": "5f60f0b30f0b504044b149bc",
            "schemaName": "Schema1",
            "createdAt": "2020-10-15T13:07:02.134Z",
            "updatedAt": "2020-10-15T13:07:02.134Z",
            "__v": 0
        },
        {
            "schemaProperties": [],
            "_id": "5f60f0b30f0b504044b149be",
            "schemaName": "Schema2",
            "createdAt": "2020-10-01T00:00:00.000Z",
            "updatedAt": "2020-10-01T00:00:00.000Z",
            "__v": 0
        }
    ]
    
### GET /api/schema/[id]

Response body:

    {
        "schemaProperties": [
          {
            "enum": [],
            "_id": "5f60f0b30f0b504044b149bb",
            "propertyName": "property1",
            "propertyType": "Date",
            "isUnique": true,
            "index": true,
            "required": true,
            "validation": {
              "after": "2013-06-30T00:00:00.000Z"
            },
            "createdAt": "2020-10-15T13:07:02.134Z",
            "updatedAt": "2020-10-15T13:07:02.134Z",
            "__v": 0
          }
        ],
        "_id": "5f60f0b30f0b504044b149bc",
        "schemaName": "Schema1",
        "createdAt": "2020-10-15T13:07:02.134Z",
        "updatedAt": "2020-10-15T13:07:02.134Z",
        "__v": 0
    }
    

### POST /api/schema

Request body:

    {
     "schemaName": "Schema3",
     "schemaProperties":[
        {
           "propertyName":"property1",
           "propertyType":"Number",
           "defaultValue":1,
           "enum":[
              1,
              2,
              3
           ],
           "isUnique":true,
           "index":true,
           "required":true,
           "validation":{ "biggerThan" : 0 }
        },
        {
           "propertyName":"property2",
           "propertyType":"ObjectId",
           "propertyRef":"Schema1",
           "isUnique":true,
           "index":true,
           "required":true
        }
      ],
    }
    
### PUT /api/schema/[id]

Request body:

    {
     "schemaName": "NewSchema1",
     "schemaProperties":[
        {
           "_id":"5f60f0b30f0b504044b149bb",
           "propertyName":"updateProperty1",
           "propertyType":"Number",
           "defaultValue":1,
           "enum":[
              1,
              2,
              3
           ],
           "isUnique":true,
           "index":true,
           "required":true,
           "validation":{ "biggerThan" : 0 },
           "createdAt":"2013-10-01T00:00:00.000Z"
        },
        {
           "propertyName":"newProperty",
           "propertyType":"Number",
           "defaultValue":1,
           "enum":[
              1,
              2,
              3
           ],
           "isUnique":true,
           "index":true,
           "required":true,
           "validation":{ "biggerThan" : 0 }
        }
      ],
      "createdAt":"2013-10-01T00:00:00.000Z"
    }  
    
## Http Errors

Error responses includes a common HTTP status code, error name and message for the developer. For example:

    {
    "name": "InvalidId",
    "message": "Invalid id",
    "status": 404
    }

Error codes and meanings:
* 200 - OK
* 400 - Bad Request
* 404 - User Error
* 500 - Internal Server Error


