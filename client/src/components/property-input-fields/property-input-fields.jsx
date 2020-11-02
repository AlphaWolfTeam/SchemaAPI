import React, { useEffect, useContext, useState } from "react";
import useStyles from "./property-input-fields.styles";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Checkbox,
  AppBar,
  Tab,
  Tabs,
} from "@material-ui/core";
import TabPanel from "../tab-panel/tab-panel";
import propertyConfig from "../shared/config/property.config";
import DynamicInputFields from "../dynamic-input-fields/dynamic-input-fields";
import ValidationInputFields from "../validation-input-fields/validation-input-fields";
import { schemasListContext } from "../shared/contexts";

const PropertyInputFields = ({ newProperty, setNewProperty }) => {
  const classes = useStyles();
  const { schemasList } = useContext(schemasListContext);
  const [pageValue, setPageValue] = useState(0);

  const handlePageChange = (event, newValue) => {
    setPageValue(newValue);
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    let value;
    if (target.type === "checkbox") {
      value = target.checked;
    } else if (target.value === "") {
      value = undefined;
    } else {
      value = target.value;
    }
    setNewProperty((prevValue) =>
      name === "propertyType"
        ? { ...prevValue, [name]: value, validation: {} }
        : { ...prevValue, [name]: value }
    );
  };

  const getPropertyInputFields = () => {
    return (
      <>
        {propertyConfig.propertyFields.map((field) => {
          switch (field.type) {
            case "String":
              return (
                <TextField
                  key={field.name}
                  name={field.name}
                  label={field.displayName}
                  value={
                    newProperty[field.name] !== undefined
                      ? newProperty[field.name]
                      : ""
                  }
                  onChange={handleChange}
                  required={field.required}
                />
              );
            case "Array":
              return (
                <FormControl required={field.required} key={field.name}>
                  <InputLabel>{field.displayName}</InputLabel>
                  <Select
                    name={field.name}
                    value={
                      newProperty[field.name] ? newProperty[field.name] : ""
                    }
                    onChange={handleChange}
                  >
                    {field.options.map((option) => {
                      return (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            case "Boolean":
              return (
                <FormControlLabel
                  key={field.name}
                  control={
                    <Checkbox
                      checked={newProperty[field.name] ? true : false}
                      onChange={handleChange}
                      name={field.name}
                      color="primary"
                    />
                  }
                  label={field.displayName}
                />
              );
            case "Enum":
              return (
                <DynamicInputFields
                  key={field.name}
                  fieldName={field.name}
                  displayName={field.displayName}
                  object={newProperty}
                  setObject={setNewProperty}
                />
              );
            default:
              return null;
          }
        })}
        {newProperty.propertyType === "ObjectId" && (
          <FormControl required>
            <InputLabel>Property Ref</InputLabel>
            <Select
              name="propertyRef"
              value={newProperty.propertyRef ? newProperty.propertyRef : ""}
              onChange={handleChange}
            >
              {schemasList.map((schema) => {
                return (
                  <MenuItem key={schema.schemaName} value={schema.schemaName}>
                    {schema.schemaName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      </>
    );
  };

  const resetBooleanValues = () => {
    propertyConfig.propertyFields.forEach((field) => {
      if (field.type === "Boolean" && !newProperty[field.name])
        setNewProperty((prevValue) => {
          return { ...prevValue, [field.name]: false };
        });
    });
  };

  const getTabProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  useEffect(() => {
    resetBooleanValues();
  }, []);

  useEffect(() => {
    if (newProperty.propertyType !== "ObjectId") {
      setNewProperty((prevValue) => {
        return { ...prevValue, propertyRef: undefined };
      });
    }
  }, [setNewProperty, newProperty.propertyType]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs variant='fullWidth' value={pageValue} onChange={handlePageChange} className={classes.tabs}>
          <Tab
            className={`${pageValue === 0 ? classes.selectedTab : ""} ${
              classes.tab
            }`}
            label="Basic Info"
            {...getTabProps(0)}
          />
          {propertyConfig.validationSchemas[newProperty.propertyType] ? (
            <Tab
              className={`${pageValue === 1 ? classes.selectedTab : ""} ${
                classes.tab
              }`}
              label="Validation"
              {...getTabProps(1)}
            />
          ) : (
            <Tab label="" {...getTabProps(1)} disabled />
          )}
        </Tabs>
      </AppBar>
      <TabPanel value={pageValue} index={0}>
        <div className={classes.page}>{getPropertyInputFields()}</div>
      </TabPanel>
      <TabPanel value={pageValue} index={1}>
        <ValidationInputFields
          property={newProperty}
          setProperty={setNewProperty}
        />
      </TabPanel>
    </div>
  );
};

export default PropertyInputFields;
