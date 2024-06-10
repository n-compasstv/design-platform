import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { KonvaElementType } from "../../../../app/types/KonvaTypes";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/useStore";
import { setLayers, setSelectedLayer } from "../../../../app/slices/layerSlice";
import TextList from "./TextList";

type ShapeDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const TextDialog: FC<ShapeDialogProps> = ({ isOpen, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Select Text</DialogTitle>
      <DialogContent dividers={true}>
        <TextList onCloseDialog={handleClose} />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "start", p: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TextDialog;
