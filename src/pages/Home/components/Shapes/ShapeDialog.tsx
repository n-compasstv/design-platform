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
import ShapeList from "./ShapeList";

type ShapeDialogProps = {
  open: boolean;
  handleClose: () => void;
};

const ShapeDialog: FC<ShapeDialogProps> = ({ open, handleClose }) => {
  const [selectedMedia, setSelectedMedia] = useState<Array<KonvaElementType>>(
    []
  );
  const dispatch = useAppDispatch();
  const { layers } = useAppSelector((u) => u.layer);

  const handleShapeClick = () => {
    if (selectedMedia.length > 0) {
      const allLayers = [...layers, ...selectedMedia];
      dispatch(setLayers(allLayers));
      dispatch(setSelectedLayer(selectedMedia[selectedMedia.length - 1]));
    }
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Select Shape</DialogTitle>
      <DialogContent dividers={true}>
        <ShapeList />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "start", p: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShapeDialog;
