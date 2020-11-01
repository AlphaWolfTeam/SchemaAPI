import React, { useState, useEffect } from "react";
import useStyles from "./property-actions.styles";
import DialogTemplate from "../dialog-template/dialog-template";
import { Button } from "@material-ui/core";
import PropertyInputFields from "../property-input-fields/property-input-fields";
import propertyConfig from "../shared/config/property.config";

const PropertyActions = ({ open, onClose, actions, initialValue }) => {
  const classes = useStyles();
  const [newProperty, setNewProperty] = useState({});

  const isAllRequiredFieldsFilled = () => {
    let isValid = true;
    propertyConfig.propertyFields.forEach((propertyField) => {
      if (
        propertyField.required &&
        (newProperty[propertyField.name] === undefined ||
          newProperty[propertyField.name] === "")
      ) {
        isValid = false;
      }
    });
    if (
      newProperty.propertyType === "ObjectId" &&
      newProperty.propertyRef === undefined
    ) {
      isValid = false;
    }
    return isValid;
  };

  const isPropertyValidated = () => {
    // TODO: Add validation
    let isValid = true;
    if (!isAllRequiredFieldsFilled()) {
      isValid = false;
      alert("Please fill all required fields");
    }
    return isValid;
  };

  useEffect(() => {
    if (initialValue) {
      setNewProperty(initialValue);
    }
  }, [initialValue]);

  return (
    <DialogTemplate
      title={`${actions[0].actionName.toUpperCase()} PROPERTY`}
      content={
        <div className={classes.content}>
          {
            <PropertyInputFields
              newProperty={newProperty}
              setNewProperty={setNewProperty}
            />
          }
        </div>
      }
      actions={
        actions &&
        actions.map((action) => (
          <Button
            key={action.actionName}
            variant="contained"
            color="primary"
            onClick={() => {
              if (isPropertyValidated()) {
                action.actionFunction(newProperty);
                setNewProperty({});
              }
            }}
          >
            {action.actionName.toUpperCase()}
          </Button>
        ))
      }
      open={open}
      onClose={onClose}
    />
  );
};

export default PropertyActions;
