import React from "react";
import useStyles from "./validation-fields.styles";
import propertyConfig from "../shared/config/property.config";

const ValidationFields = ({ property }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {Object.keys(property.validation).length === 0 ? (
        <pre>none</pre>
      ) : (
        propertyConfig.validationSchemas[property.propertyType] &&
        propertyConfig.validationSchemas[property.propertyType].map(
          (validationField) =>
            property.validation[validationField.name] !== undefined && (
              <div key={validationField.name}>
                <pre>
                  {validationField.displayName}-{" "}
                  {validationField.type === "Array" ||
                  validationField.type === "Boolean"
                    ? JSON.stringify(property.validation[validationField.name])
                    : property.validation[validationField.name]}
                </pre>
              </div>
            )
        )
      )}
    </div>
  );
};

export default ValidationFields;
