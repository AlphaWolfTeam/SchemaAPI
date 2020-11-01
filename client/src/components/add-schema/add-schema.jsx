import React, { useState, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import AddProperty from "../add-property/add-property";
import { schemasListContext } from "../shared/contexts";
import { useHistory } from "react-router";
import useStyles from "./add-schema.styles";
import EditablePropertiesList from "../editable-properties-list/editable-properties-list";

const AddSchema = () => {
  const classes = useStyles();
  let history = useHistory();
  const { setSchemasList } = useContext(schemasListContext);
  const [schemaName, setSchemaName] = useState("");
  const [schemaProperties, setSchemaProperties] = useState([]);
  const [openCreatePropertyDialog, setOpenCreatePropertyDialog] = useState(
    false
  );

  const handleSchemaCreation = () => {
    // TODO: create schema
    setSchemasList((prevSchemas) => [
      ...prevSchemas,
      {
        schemaName: schemaName,
        schemaProperties: schemaProperties,
      },
    ]);
    history.push("/");
  };

  const handleOpenCreatePropertyDialog = () => {
    setOpenCreatePropertyDialog(true);
  };

  const handleCloseCreatePropertyDialog = () => {
    setOpenCreatePropertyDialog(false);
  };
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>ADD SCHEMA</h1>
      <TextField
        id="standard-basic"
        label="Schema Name"
        value={schemaName}
        onChange={(event) => {
          setSchemaName(event.target.value);
        }}
      />
      <br />
      <br />
      <EditablePropertiesList
        propertiesList={schemaProperties}
        setPropertiesList={setSchemaProperties}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCreatePropertyDialog}
      >
        ADD PROPERTY
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSchemaCreation}
      >
        CREATE
      </Button>
      <Button variant="contained" color="primary" href="/">
        CANCEL
      </Button>
      <AddProperty
        open={openCreatePropertyDialog}
        onClose={handleCloseCreatePropertyDialog}
        schemaProperties={schemaProperties}
        setSchemaProperties={setSchemaProperties}
      />
    </div>
  );
};

export default AddSchema;
