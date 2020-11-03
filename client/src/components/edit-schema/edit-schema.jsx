import React, { useContext, useState, useEffect } from "react";
import { schemasListContext } from "../shared/contexts";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { TextField, Button } from "@material-ui/core";
import EditablePropertiesList from "../editable-properties-list/editable-properties-list";
import AddProperty from "../add-property/add-property";
import useStyles from "./edit-schema.styles";
import SchemaService from "../../services/SchemaService";

const EditSchema = () => {
  const classes = useStyles();
  let history = useHistory();
  const { schemaName } = useParams();
  const { schemasList, setSchemasList } = useContext(schemasListContext);
  const prevSchema = schemasList.find(
    (schema) => schema.schemaName === `${schemaName}`
  );
  const [newSchema, setNewSchema] = useState({});
  const [openCreatePropertyDialog, setOpenCreatePropertyDialog] = useState(
    false
  );

  const handleChangeName = (event) => {
    setNewSchema({ ...newSchema, schemaName: event.target.value });
  };

  const handleOpenCreatePropertyDialog = () => {
    setOpenCreatePropertyDialog(true);
  };

  const handleCloseCreatePropertyDialog = () => {
    setOpenCreatePropertyDialog(false);
  };
  const handleSchemaUpdate = async () => {
    await SchemaService.updateSchema(prevSchema._id, newSchema);
    await setSchemasList(await SchemaService.getSchemasList());
    history.push("/");
  };

  const setSchemaProperties = (schemaProperties) => {
    setNewSchema((prevNewSchema) => {
      return { ...prevNewSchema, schemaProperties: schemaProperties };
    });
  };

  useEffect(() => {
    setNewSchema(prevSchema);
  }, [prevSchema]);

  return (
    <div className={classes.root}>
      {newSchema && (
        <>
          <h1 className={classes.title}>EDIT SCHEMA</h1>
          <TextField
            id="standard-basic"
            label="Schema Name"
            defaultValue={newSchema.schemaName}
            onChange={(event) => handleChangeName(event)}
          />
          <br />
          <br />
          {newSchema.schemaProperties && (
            <EditablePropertiesList
              propertiesList={newSchema.schemaProperties}
              setPropertiesList={(newSchemaProperties) =>
                setSchemaProperties(newSchemaProperties)
              }
            />
          )}
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
            onClick={() => handleSchemaUpdate()}
          >
            EDIT
          </Button>
          <Button variant="contained" color="primary" href="/">
            CANCEL
          </Button>
          <AddProperty
            open={openCreatePropertyDialog}
            onClose={handleCloseCreatePropertyDialog}
            schemaProperties={newSchema.schemaProperties}
            setSchemaProperties={setSchemaProperties}
          />
        </>
      )}
    </div>
  );
};

export default EditSchema;
