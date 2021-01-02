import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./dragAndDropList.scss";
import firebase from "firebase/app";
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
export type props = {
  exercises: any;
  id: string;
  refUrl: string;
};
const DragAndDropList = ({ exercises, id, refUrl }: props) => {
  const [listItems, setListItems] = useState(
    exercises.map((exercise: any, index: number) => {
      return {
        id: `${index + 1}`,
        content: exercise.workoutName,
        key: exercise.key,
      };
    })
  );
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items: any = reorder(
      listItems,
      result.source.index,
      result.destination.index
    );
    setListItems(items);
    firebase.database().ref(refUrl).set({});
    items.forEach((item: any) => {
      firebase.database().ref(refUrl).push().set({ workoutName: item.content });
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            className="list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {listItems.map((item: any, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className="list__item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default DragAndDropList;
