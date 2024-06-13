import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { KonvaElementType } from "../../../../app/types/KonvaTypes";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/useStore";
import { setLayers, setSelectedLayer } from "../../../../app/slices/layerSlice";

type MediaDialogProps = {
  isOpen: boolean;
  elementIdToDelete: string | undefined;
  handleClose: () => void;
};

const DeleteLayerDialog: FC<MediaDialogProps> = ({
  isOpen,
  elementIdToDelete,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const { layers } = useAppSelector((u) => u.layer);

  const handleDeleteLayer = () => {
    if (elementIdToDelete) {
      const newLayers = [...layers].filter(
        (f) => f.elementId != elementIdToDelete
      );
      dispatch(setLayers(newLayers));
    }
  };

  return (
    <Dialog
      maxWidth="sm"
      open={isOpen}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Delete Confirmation</DialogTitle>
      <DialogContent dividers={true}>
        <Typography>Are you sure you want to delete this layer?</Typography>
        <Typography>
          <small>This will permanently delete the layer.</small>
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "start", p: 2 }}>
        <Button variant="contained" color="error" onClick={handleDeleteLayer}>
          Yes, Proceed
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteLayerDialog;
