"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Todo } from "@prisma/client";
import { TodoList } from "./TodoList";
import { useEffect, useState } from "react";

interface TodoContainerProps {
  todoList: Todo[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const TodoContainer = ({ todoList }: TodoContainerProps) => {
  const [data, setData] = useState(todoList);
  useEffect(() => {
    setData(data);
  }, [data]);
  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // User moves a list
    if (type === "list") {
      const items = reorder(data, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setData(items);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {data.map((todo, index) => (
              <TodoList todo={todo} key={todo.todoId} index={index} />
            ))}
            {provided.placeholder}
            <div className="flex-shrink-0 w-1" />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
