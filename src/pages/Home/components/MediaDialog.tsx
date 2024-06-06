import React, { FC } from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

type MediaDialogProps = {
  open: boolean;
  content?: JSX.Element | string | undefined;
  handleClose: () => void;
};

const MediaDialog: FC<MediaDialogProps> = ({ open, content, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        Media Library
        <Typography>
          <small>Select one or more asset to include in your project.</small>
        </Typography>
      </DialogTitle>
      <DialogContent dividers={true}>{content}</DialogContent>
      <DialogActions sx={{ justifyContent: "start", p: 2 }}>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Add to Project
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MediaDialog;
