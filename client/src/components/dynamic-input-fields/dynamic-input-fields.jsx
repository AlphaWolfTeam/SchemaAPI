import React from "react";
import useStyles from "./dynamic-input-fields.styles";
import { FormLabel, Button, TextField, FormControl } from "@material-ui/core";
import { FaTrash, FaPlusSquare } from "react-icons/fa";

// TODO: fix the fact that we can insert only one char at a time to the inputs
const DynamicInputFields = ({ fieldName, displayName, object, setObject }) => {
  const classes = useStyles();

  const handleFieldChange = (event, index) => {
    const target = event.target;
    const name = target.name;
    const value = target.value === "" ? undefined : target.value;
    const values = [...object[name]];
    values[index] = value;
    setObject({ ...object, [name]: values });
  };

  const handleAddFields = () => {
    const values = object[fieldName] ? [...object[fieldName]] : [];
    values.push(undefined);
    setObject({ ...object, [fieldName]: values });
  };

  const handleRemoveFields = (index) => {
    const values = [...object[fieldName]];
    values.splice(index, 1);
    setObject({ ...object, [fieldName]: values });
  };

  return (
    <FormControl>
      <FormLabel className={classes.label}>
        {displayName}
        <Button className={classes.button} onClick={() => handleAddFields()}>
          <FaPlusSquare />
        </Button>
      </FormLabel>
      {object[fieldName] &&
        object[fieldName].map((value, index) => (
          <div key={`${value}~${index}`} className={classes.field}>
            <TextField
              onChange={(event) => handleFieldChange(event, index)}
              value={value}
              name={fieldName}
            />
            <Button
              className={classes.button}
              onClick={(event) => handleRemoveFields(index)}
            >
              <FaTrash />
            </Button>
          </div>
        ))}
    </FormControl>
  );
};

export default DynamicInputFields;
