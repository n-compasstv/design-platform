import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { useAppSelector } from "../../../app/hooks/useStore";

type MediaDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const SaveTemplateDialog: FC<MediaDialogProps> = ({ isOpen, handleClose }) => {
  const { layers } = useAppSelector((u) => u.layer);

  return (
    <Dialog
      maxWidth="sm"
      open={isOpen}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Save Template</DialogTitle>
      <DialogContent dividers={true}>
        <Typography>
          <pre>{JSON.stringify(layers)}</pre>
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "start", p: 2 }}>
        <Button variant="contained" color="error">
          Yes, Save
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveTemplateDialog;
