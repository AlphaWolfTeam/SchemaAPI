import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    background: "white",
    border: "1px solid #3F51B5",
  },
  listItem: {
    color: "#3F51B5",
    fontWeight: "500",
    background: "#a8b3f5",
    marginBottom: '5px'
  },
}));

export default useStyles;