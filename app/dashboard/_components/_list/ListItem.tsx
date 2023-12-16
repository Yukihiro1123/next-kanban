import { cn } from "@/lib/utils";
import { ListWithTodos } from "@/types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { TodoItem } from "../_todo/TodoItem";
import { ListItemHeader } from "../_list/ListItemHeader";
import { AddTodoButton } from "../_todo/AddTodoButton";

interface ListItemProps {
  data: ListWithTodos;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <Draggable draggableId={data.listId} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none rounded-md bg-[#f1f2f4] shadow-md"
        >
          <div {...provided.dragHandleProps} className="w-full  pb-2">
            <ListItemHeader data={data} />
            <Droppable droppableId={data.listId} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.todos.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data.todos.map((todo, index) => (
                    <TodoItem index={index} key={todo.todoId} data={todo} />
                  ))}
                  <div className="flex justify-start">
                    <AddTodoButton listId={data.listId} />
                  </div>
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
          </div>
        </li>
      )}
    </Draggable>
  );
};
