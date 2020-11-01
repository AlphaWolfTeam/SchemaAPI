import React from "react";
import useStyles from "./property-view.styles";
import DialogTemplate from "../dialog-template/dialog-template";
import PropertyFields from "../property-fields/property-fields";

const PropertyView = ({ open, onClose, property, schema }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {property && (
        <DialogTemplate
          title={property.propertyName}
          content={<PropertyFields property={property} />}
          open={open}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default PropertyView;
