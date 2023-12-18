import { cn } from "@/lib/utils";
import { ListWithTodos } from "@/types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { TodoItem } from "../_todo/TodoItem";
import { ListItemHeader } from "./ListItemHeader";
import { TodoForm } from "../_todo/TodoForm";
import { Plus } from "lucide-react";

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
          className="shrink-0 h-full w-[272px] select-none rounded-md  shadow-md border-2"
        >
          <div {...provided.dragHandleProps} className="w-full  pb-2">
            <ListItemHeader data={data} />
            <Droppable droppableId={data.listId} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2 ",
                    data.todos.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data.todos.map((todo, index) => (
                    <TodoItem index={index} key={todo.todoId} data={todo} />
                  ))}
                  <div className="flex justify-start">
                    <TodoForm listId={data.listId}>
                      <Plus className="h-4 w-4" />
                    </TodoForm>
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
