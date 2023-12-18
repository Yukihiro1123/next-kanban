import { Todo } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TodoForm } from "./TodoForm";

interface TodoItemProps {
  data: Todo;
  index: number;
}
export const TodoItem = ({ data, index }: TodoItemProps) => {
  return (
    <Draggable draggableId={data.todoId} index={index}>
      {(provided) => (
        <TodoForm todo={data}>
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role="button"
            className="truncate border-2  hover:border-black py-2 px-3 text-sm rounded-md shadow-sm w-full text-start"
          >
            {data.title}
          </Card>
        </TodoForm>
      )}
    </Draggable>
  );
};
