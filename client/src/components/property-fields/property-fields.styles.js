import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily:'Consolas,monospace'
  },
  date: {
    fontWeight: "500",
    color: "blue",
    textAlign: "center",
    fontSize:'small'
  },
  field: {
    display: "flex",
    justifyContent: "space-around",
  },
  fieldTitle: {
    fontWeight: "800",
    color: "blue",
    fontFamily:'Consolas,monospace',
    textAlign:'left'
  },
  fieldValue: {
    fontFamily:'Consolas,monospace',
    textAlign:'left'
  },
}));
export default useStyles;
