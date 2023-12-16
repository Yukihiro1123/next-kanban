import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TodoForm } from "./TodoForm";

export const AddTodoButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" size="icon" onClick={() => console.log("Hi")}>
          <PlusCircle className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <TodoForm />
      </SheetContent>
    </Sheet>
  );
};
