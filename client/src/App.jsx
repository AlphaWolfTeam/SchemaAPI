import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Schemas from "./components/schemas/schemas";
import Schema from "./components/schema/schema";
import Migrations from "./components/migrations/migrations";
import Settings from "./components/settings/settings";
import AppBar from "./components/side-bar/side-bar";
import useStyles from "./App.styles";
import AddSchema from "./components/add-schema/add-schema";
import EditSchema from "./components/edit-schema/edit-schema";
import { schemasListContext } from "./components/shared/contexts";
import SchemaService from "./services/SchemaService";

const App = () => {
  const classes = useStyles();
  const [schemasList, setSchemasList] = useState([]);

  const getSchemaList = async () => {
    // TODO: use service
    // setSchemasList(await SchemaService.getSchemasList());
    setSchemasList([
      {
        _id: "5f60f0b30f0b504044b149ba",
        schemaName: "schema 1",
        schemaProperties: [
          {
            _id: "5f60f0b30f0b504044b149bb",
            propertyName: "property1",
            propertyType: "Number",
            defaultValue: 1,
            enum: [1, 2, 3],
            isUnique: true,
            index: false,
            required: true,
            validation: { biggerThan: 0, differFrom: [4, 5] },
            createdAt: "2020-10-15T13:07:02.134Z",
            updatedAt: "2020-10-15T13:07:02.134Z",
            __v: 0,
          },
        ],
        createdAt: "2020-10-15T13:07:02.134Z",
        updatedAt: "2020-10-15T13:07:02.134Z",
      },
      {
        _id: "5f60f0b30f0b504044b149bc",
        schemaName: "schema 2",
        schemaProperties: [],
        createdAt: "2020-10-15T13:07:02.134Z",
        updatedAt: "2020-10-15T13:07:02.134Z",
      },
      {
        _id: "5f60f0b30f0b504044b149bd",
        schemaName: "schema 3",
        schemaProperties: [],
        createdAt: "2020-10-15T13:07:02.134Z",
        updatedAt: "2020-10-15T13:07:02.134Z",
      },
    ]);
  };

  useEffect(() => {
    getSchemaList();
  }, []);

  return (
    <Router>
      <div className={classes.root}>
        <AppBar />
        <div className={classes.page}>
          <Switch>
            <Route path="/migrations">
              <Migrations />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/addSchema">
              <schemasListContext.Provider
                value={{ schemasList, setSchemasList }}
              >
                <AddSchema />
              </schemasListContext.Provider>
            </Route>
            <Route path="/edit/:schemaName">
              <schemasListContext.Provider
                value={{ schemasList, setSchemasList }}
              >
                <EditSchema />
              </schemasListContext.Provider>
            </Route>
            <Route path="/:schemaName">
              <schemasListContext.Provider
                value={{ schemasList, setSchemasList }}
              >
                <Schema />
              </schemasListContext.Provider>
            </Route>
            <Route path="/">
              <schemasListContext.Provider
                value={{ schemasList, setSchemasList }}
              >
                <Schemas />
              </schemasListContext.Provider>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
