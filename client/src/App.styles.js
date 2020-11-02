import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  page: {
    minWidth: "45%",
    textAlign: "center",
  },
}));

export default useStyles;
