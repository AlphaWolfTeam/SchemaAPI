import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  dialogTitle: {
    marginRight: theme.spacing(30),
    color: "#3F51B5",
  }, 
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogContent: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
  },
}));

export default useStyles;
