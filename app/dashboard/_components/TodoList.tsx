import { Card, CardContent } from "@/components/ui/card";
import { Draggable } from "@hello-pangea/dnd";
import { Todo } from "@prisma/client";

interface TodoContainerProps {
  todo: Todo;
  index: number;
}

export const TodoList = ({ todo, index }: TodoContainerProps) => {
  return (
    <Draggable draggableId={todo.todoId} index={index}>
      {(provided) => (
        <Card
          key={todo.todoId}
          className="w-[250px] truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => {}}
        >
          <CardContent>{todo.title}</CardContent>
        </Card>
      )}
    </Draggable>
  );
};
