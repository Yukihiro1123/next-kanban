import { addTodo, deleteTodo, updateTodo } from "@/app/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Todo } from "@prisma/client";

interface AddTodoButtonProps {
  listId?: string;
  todo?: Todo;
}

export const TodoForm = ({ listId, todo }: AddTodoButtonProps) => {
  return (
    <form action={todo ? updateTodo : addTodo}>
      <input type="hidden" name="listId" value={listId} />
      <input type="hidden" name="todoId" value={todo && todo.todoId} />
      <SheetHeader>
        <SheetTitle>タスクの{todo ? "編集" : "追加"}</SheetTitle>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            タイトル
          </Label>
          <Input
            name="title"
            className="col-span-3"
            defaultValue={todo?.title}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            概要
          </Label>
          <Textarea
            name="overview"
            className="col-span-3"
            defaultValue={todo?.overview}
          />
        </div>
      </div>
      <SheetFooter>
        {todo && (
          <SheetClose asChild>
            <Button onClick={() => deleteTodo(todo.todoId)}>削除</Button>
          </SheetClose>
        )}
        <SheetClose asChild>
          <Button type="submit">{todo ? "更新" : "登録"}</Button>
        </SheetClose>
      </SheetFooter>
    </form>
  );
};
