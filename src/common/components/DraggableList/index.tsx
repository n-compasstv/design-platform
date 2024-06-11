import { FC } from "react";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { List } from "@mui/material";
import { DraggableItemType } from "../../../app/types/draggable";
import DraggableListItem from "./DraggableListItem";

export type Props = {
  items: DraggableItemType[];
  onDragEnd: OnDragEndResponder;
  onClickItem?: (event: React.MouseEvent<HTMLElement>, id: string) => void;
};

const DraggableList: FC<Props> = ({ items, onDragEnd, onClickItem }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ py: 0 }}
          >
            {items.map((item: DraggableItemType, index: number) => {
              return (
                <DraggableListItem
                  id={item.id}
                  index={index}
                  key={item.id}
                  content={item.content}
                  isLastItem={index == items.length - 1}
                  isSelected={item.isSelected}
                  onClickItem={onClickItem}
                />
              );
            })}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
