import React from "react";
import useStyles from "./settings.styles";

const Settings = () => {
  const classes = useStyles();

  return <h1 className={classes.title}>SETTINGS</h1>;
};

export default Settings;
