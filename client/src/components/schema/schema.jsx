import React, { useContext, useState, useEffect } from "react";
import { schemasListContext } from "../shared/contexts";
import PropertyView from "../property-view/property-view";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import useStyles from "./schema.styles";
import ClickablePropertiesList from "../clickable-properties-list/clickable-properties-list";
import SchemaService from '../../services/SchemaService';

const Schema = () => {
  const classes = useStyles();
  let history = useHistory();
  const { schemaName } = useParams();
  const { schemasList, setSchemasList } = useContext(schemasListContext);
  const schema = schemasList.find(
    (schema) => schema.schemaName === `${schemaName}`
  );
  const [selectedProperty, setSelectedProperty] = useState(undefined);

  const handleOpenViewPropertyDialog = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseViewPropertyDialog = () => {
    setSelectedProperty(undefined);
  };

  const handleDeleteSchema = async () => {
    await setSchemasList(await SchemaService.deleteSchemaById(schema._id));
    await setSchemasList(await SchemaService.getSchemasList());
    history.push("/");
  };

  useEffect(() => {
    console.log("schema", schema);
  }, [schema]);

  return (
    <div className={classes.root}>
      {schema && (
        <>
          <h1 className={classes.title}>
            {schema ? schema.schemaName : "Schema not found"}
          </h1>
          <div className={classes.date}>
            Created At {new Date(schema.createdAt).toLocaleString()} | Updated
            At {new Date(schema.updatedAt).toLocaleString()}
          </div>
          <hr></hr>
          {schema.schemaProperties && (
            <>
              <ClickablePropertiesList
                propertiesList={schema.schemaProperties}
                onClick={(property) => handleOpenViewPropertyDialog(property)}
              />
              <PropertyView
                open={selectedProperty !== undefined}
                onClose={handleCloseViewPropertyDialog}
                schema={schema}
                property={selectedProperty}
              />
            </>
          )}
          <br />
          <div className={classes.buttons}>
            <Fab
              color="primary"
              href={`/edit/${schema.schemaName}`}
              className={classes.button}
            >
              <EditIcon />
            </Fab>
            <Fab
              color="primary"
              onClick={() => handleDeleteSchema()}
              className={classes.button}
            >
              <DeleteIcon />
            </Fab>
          </div>
        </>
      )}
    </div>
  );
};

export default Schema;
