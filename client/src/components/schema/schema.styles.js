import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "50vh",
  },
  title: {
    color: "#3F51B5",
    fontWeight: "700",
    textAlign: "center",
  },
  date: {
    fontWeight: "500",
    color: "#3F51B5",
    textAlign: "center",
    fontSize: "medium",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: "3px",
  },
}));

export default useStyles;
