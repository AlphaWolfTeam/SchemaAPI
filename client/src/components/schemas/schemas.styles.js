import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "93%",
    height: "100%",
  },
  title: {
    color: "#3F51B5",
    fontWeight: "700",
    textAlign: "center",
  },
  card: {
    width: "200px",
    height: "100px",
    border: "1px solid #3F51B5",
    margin: "10px",
    color: "#3F51B5",
    fontWeight: "500",
    fontSize: "large",
    background: "#a8b3f5",
  },
  schemaList: {
    display: "flex",
    justifyContent: "center",
  },
  message: {
    color: "#a8b3f5",
  },
}));

export default useStyles;
