import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import { FaRegIdBadge } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tabs: {
    boxShadow: "blue"
  },
  tab: {
    fontWeight: "700",
    background: "primary",
  },
  selectedTab: {
    backgroundColor: "#7083f0",
    color: "darkBlue"
  },
  page: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default useStyles;
