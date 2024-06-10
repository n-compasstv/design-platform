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
};

const DraggableList: FC<Props> = ({ items, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item: DraggableItemType, index: number) => {
              const revIndex = items.slice(index, items.length-1).length
              const revItem = items[revIndex];
              return (
                <DraggableListItem
                  id={item.id}
                  index={index}
                  key={item.id}
                  content={item.content}
                  isLastItem={index == items.length - 1}
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