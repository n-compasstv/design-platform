import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  ListItem,
} from "@mui/material";
import { MdDragIndicator } from "react-icons/md";

export type Props = {
  id: string;
  index: number;
  content: string | JSX.Element;
  isLastItem?: boolean;
};

const DraggableListItem: FC<Props> = ({ id, index, content, isLastItem }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided: any, snapshot: any) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            background: snapshot.isDragging ? "rgb(235,235,235)" : "inherit",
            justifyContent: "space-between",
            borderTop: "1px solid #bfbfbf45",
            borderBottom: isLastItem ? "1px solid #bfbfbf45" : "",
          }}
          
        >
          {content}
          <span {...provided.dragHandleProps}>
            <MdDragIndicator />
          </span>
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
