import React from "react";
import PropertyActions from "../property-actions/property-actions";
import useStyles from "./add-property.styles";

const AddProperty = ({
  open,
  onClose,
  schemaProperties,
  setSchemaProperties,
}) => {
  const classes = useStyles();

  const handlePropertyCreation = (newProperty) => {
    // TODO: Check if property name already exist
    const save = [...schemaProperties];
    save.push(newProperty);
    setSchemaProperties(save);
  };

  return (
    <PropertyActions
      actions={[
        {
          actionName: "create",
          actionFunction: (newProperty) => {
            handlePropertyCreation(newProperty);
            onClose();
          },
        },
      ]}
      open={open}
      onClose={onClose}
    />
  );
};

export default AddProperty;
