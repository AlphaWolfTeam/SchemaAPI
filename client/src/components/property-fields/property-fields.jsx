import React from "react";
import useStyles from "./property-fields.styles";
import propertyConfig from "../shared/config/property.config";
import ValidationFields from "../validation-fields/validation-fields";

const PropertyFields = ({ property }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.date}>
        Created At {new Date(property.createdAt).toLocaleString()} | Updated At{" "}
        {new Date(property.updatedAt).toLocaleString()}
      </div>
      {propertyConfig.propertyFields.map((field) => {
        return property[field.name] !== undefined ? (
          <div key={field.name} className={classes.field}>
            <h3 className={classes.fieldTitle}>{field.displayName}</h3>
            <pre className={classes.fieldValue}>
              {field.type === "Enum" || field.type === "Boolean"
                ? JSON.stringify(property[field.name])
                : property[field.name]}
            </pre>
          </div>
        ) : null;
      })}
      {property.validation !== undefined && (
        <div key="validation" className={classes.field}>
          <h3 className={classes.fieldTitle}>Validation</h3>
          <ValidationFields property={property} />
        </div>
      )}
    </div>
  );
};

export default PropertyFields;
