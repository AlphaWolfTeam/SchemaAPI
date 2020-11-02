import React from "react";
import { NavLink } from "react-router-dom";
import { Drawer, List, ListItem } from "@material-ui/core";
import useStyles from "./side-bar.styles";

const AppBar = () => {
  const classes = useStyles();
  const listItems = ["Settings", "Schemas", "Migrations"];

  return (
    <Drawer variant="permanent" className={classes.drawer}>
      <List>
        {listItems.map((text) => (
          <ListItem button key={text}>
            <NavLink
              to={text === "Schemas" ? "/" : `/${text.toLowerCase()}`}
              className={classes.link}
            >
              {text}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AppBar;
