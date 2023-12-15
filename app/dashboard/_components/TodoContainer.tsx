"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Todo } from "@prisma/client";
import { TodoList } from "./TodoList";

interface TodoContainerProps {
  todoList: Todo[];
}

const onDragEnd = (result: any) => {
  const { destination, source, type } = result;
  console.log(destination, source, type);
};

export const TodoContainer = ({ todoList }: TodoContainerProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoList.map((todo, index) => (
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
