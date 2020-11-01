import React from "react";
import { ListItem, List } from "@material-ui/core";
import useStyles from "./editable-properties-list.styles";
import Scrollbar from "react-scrollbars-custom";
import EditableProperty from "../editable-property/editable-property";

const EditablePropertiesList = ({ propertiesList, setPropertiesList }) => {
  const classes = useStyles();

  return (
    <>
      <Scrollbar className={classes.root}>
        <List>
          {propertiesList.length > 0 ? (
            propertiesList.map((property) => (
              <div key={property.propertyName} className={classes.listItem}>
                <EditableProperty
                  property={property}
                  schemaProperties={propertiesList}
                  setSchemaProperties={setPropertiesList}
                />
              </div>
            ))
          ) : (
            <ListItem className={classes.listItem}>
              There are no properties
            </ListItem>
          )}
        </List>
      </Scrollbar>
    </>
  );
};

export default EditablePropertiesList;
