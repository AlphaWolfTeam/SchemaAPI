import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight:'500'
  },
  field: {
    display: "flex",
  },
  button: {
    color: "blue",
    fontWeight: "800",
  },
}));

export default useStyles;
