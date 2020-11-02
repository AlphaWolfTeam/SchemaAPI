import React, { useContext, useEffect } from "react";
import { List, ListItem } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import useStyles from "./schemas.styles";
import { schemasListContext } from "../shared/contexts";
import { useHistory } from "react-router";

const Schemas = () => {
  let history = useHistory();
  const classes = useStyles();
  const { schemasList } = useContext(schemasListContext);

  const handleChooseSchema = (schema) => {
    history.push(`/${schema.schemaName}`);
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>SCHEMAS</h1>
      <List className={classes.schemaList}>
        {schemasList && schemasList.length > 0 ? schemasList.map((schema) => (
          <ListItem
            className={classes.card}
            button
            key={schema.schemaName}
            onClick={() => {
              handleChooseSchema(schema);
            }}
          >
            {schema.schemaName}
          </ListItem>
        )): <h3 className={classes.message}>There are no schemas</h3>}
      </List>  
      <Fab color="primary" aria-label="add" href="/addSchema">
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Schemas;
