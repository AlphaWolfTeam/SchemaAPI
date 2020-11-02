import React, { useState } from "react";
import { ListItem } from "@material-ui/core";
import PropertyActions from "../property-actions/property-actions";
import useStyles from "./editable-property.styles";

const EditableProperty = ({
  property,
  schemaProperties,
  setSchemaProperties,
}) => {
  const classes = useStyles();
  const [openUpdatePropertyDialog, setOpenUpdatePropertyDialog] = useState(
    false
  );

  const handleOpenUpdatePropertyDialog = () => {
    setOpenUpdatePropertyDialog(true);
  };

  const handleCloseUpdatePropertyDialog = () => {
    setOpenUpdatePropertyDialog(false);
  };

  const handlePropertyUpdate = (newProperty) => {
    const save = [...schemaProperties];
    const propertyIndex = save
      .map((newProperty) => newProperty._id)
      .indexOf(newProperty._id);
    save[propertyIndex] = newProperty;
    setSchemaProperties(save);
  };

  const handleDeleteProperty = (propertyToDelete) => {
    const save = [...schemaProperties];
    const propertyIndex = save
      .map((property) => property._id)
      .indexOf(propertyToDelete._id);
    save.splice(propertyIndex, 1);
    setSchemaProperties(save);
  };

  return (
    <>
      <ListItem
        button
        onClick={handleOpenUpdatePropertyDialog}
        key={property.propertyName}
      >
        {property.propertyName}
      </ListItem>
      <PropertyActions
        actions={[
          {
            actionName: "edit",
            actionFunction: (newProperty) => {
              handlePropertyUpdate(newProperty);
              handleCloseUpdatePropertyDialog();
            },
          },
          {
            actionName: "delete",
            actionFunction: (property) => {
              handleDeleteProperty(property);
              handleCloseUpdatePropertyDialog();
            },
          },
        ]}
        open={openUpdatePropertyDialog}
        onClose={handleCloseUpdatePropertyDialog}
        initialValue={property}
      />
    </>
  );
};

export default EditableProperty;
