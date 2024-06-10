import React, { FC } from 'react';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { List } from '@mui/material';
import { DraggableItemType } from '../../../app/types/draggable';
import DraggableListItem from './DraggableListItem';

export type Props = {
  items: DraggableItemType[];
  onDragEnd: OnDragEndResponder;
};

const DraggableList: FC<Props> = React.memo(({ items, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item: DraggableItemType, index: number) => (
              <DraggableListItem id={item.id} index={index} key={item.id} content={item.content} />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default DraggableList;
