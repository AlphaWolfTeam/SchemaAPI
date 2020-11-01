import React from "react";
import { ListItem, List } from "@material-ui/core";
import useStyles from "./clickable-properties-list.styles";
import Scrollbar from "react-scrollbars-custom";

const ClickablePropertiesList = ({ propertiesList, onClick }) => {
  const classes = useStyles();

  return (
    <>
      <Scrollbar className={classes.root}>
        <List>
          {propertiesList.length > 0 ? (
            propertiesList.map((property) => (
              <ListItem
                button
                key={property.propertyName}
                onClick={() => onClick(property)}
                className={classes.listItem}
              >
                {property.propertyName}
              </ListItem>
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

export default ClickablePropertiesList;
