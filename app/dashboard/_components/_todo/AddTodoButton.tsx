import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TodoForm } from "../_todo/TodoForm";

interface AddTodoButtonProps {
  listId: string;
}

export const AddTodoButton = ({ listId }: AddTodoButtonProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Plus className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <TodoForm listId={listId} />
      </SheetContent>
    </Sheet>
  );
};
