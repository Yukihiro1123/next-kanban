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
        <Sheet>
          <SheetTrigger asChild>
            <Card
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              role="button"
              className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
            >
              {data.title}
            </Card>
          </SheetTrigger>
          <SheetContent>
            <TodoForm todo={data} />
          </SheetContent>
        </Sheet>
      )}
    </Draggable>
  );
};
