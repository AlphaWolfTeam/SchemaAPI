import React, { useEffect } from "react";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import useStyles from "./validation-input-fields.styles";
import propertyConfig from "../shared/config/property.config";
import DynamicInputFields from "../dynamic-input-fields/dynamic-input-fields";

const ValidationInputFields = ({ property, setProperty }) => {
  const classes = useStyles();

  const setPropertyValidation = (newPropertyValidation) => {
    setProperty((prevValue) => {
      return {
        ...prevValue,
        validation: newPropertyValidation,
      };
    });
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    let value;
    if (target.type === "checkbox") {
      value = target.checked;
    } else if (target.value === "") {
      value = undefined;
    } else {
      value = target.value;
    }
    setProperty((prevValue) => {
      return {
        ...prevValue,
        validation: { ...property.validation, [name]: value },
      };
    });
  };

  useEffect(() => {
    if (propertyConfig.validationSchemas[property.propertyType]) {
      propertyConfig.validationSchemas[property.propertyType].forEach(
        (field) => {
          if (field.type === "Boolean")
            setProperty((prevValue) => {
              return {
                ...prevValue,
                validation: {
                  ...prevValue.validation,
                  [field.name]: false,
                },
              };
            });
        }
      );
    }
  }, [setProperty, property.propertyType]);

  return (
    <div className={classes.root}>
      {propertyConfig.validationSchemas[property.propertyType] &&
        propertyConfig.validationSchemas[property.propertyType].map(
          (validationField) => {
            switch (validationField.type) {
              case "String":
              case "Number":
              case "Date":
                return (
                  <TextField
                    key={validationField.name}
                    name={validationField.name}
                    label={validationField.displayName}
                    value={
                      property.validation &&
                      property.validation[validationField.name] !== undefined
                        ? property.validation[validationField.name]
                        : ""
                    }
                    onChange={handleChange}
                  />
                );
              case "Boolean":
                return (
                  <FormControlLabel
                    key={validationField.name}
                    control={
                      <Checkbox
                        checked={
                          property.validation &&
                          property.validation[validationField.name]
                            ? true
                            : false
                        }
                        onChange={handleChange}
                        name={validationField.name}
                        color="primary"
                      />
                    }
                    label={validationField.displayName}
                  />
                );
              case "Array":
                return (
                  <DynamicInputFields
                    key={validationField.name}
                    fieldName={validationField.name}
                    displayName={validationField.displayName}
                    object={property.validation}
                    setObject={setPropertyValidation}
                  />
                );
              default:
                return null;
            }
          }
        )}
    </div>
  );
};

export default ValidationInputFields;
