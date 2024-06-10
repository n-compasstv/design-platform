import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Tooltip,
  Box,
} from "@mui/material";
import { MdDragIndicator } from "react-icons/md";

export type Props = {
  id: string;
  index: number;
  content: string | JSX.Element;
};

const DraggableListItem: FC<Props> = ({ id, index, content }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided: any, snapshot: any) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={snapshot.isDragging ? { background: "rgb(235,235,235)" } : ""}
        >
          <MdDragIndicator />
          {content}
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
