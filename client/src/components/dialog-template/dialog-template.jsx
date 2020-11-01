import React from "react";
import useStyles from "./dialog-template.styles";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const DialogTemplate = ({ title, content, actions, open, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle title={title} onClose={onClose} disableTypography>
        <Typography variant="h4" className={classes.dialogTitle}>
          {title}
        </Typography>
        {onClose ? (
          <IconButton onClick={onClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent className={classes.dialogContent} dividers>
        {content}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>{actions}</DialogActions>
    </Dialog>
  );
};

export default DialogTemplate;
