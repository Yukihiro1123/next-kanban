import { updateTodo } from "@/app/actions/todo/update-todo";
import { createTodo } from "@/app/actions/todo/create-todo";
import { deleteTodo } from "@/app/actions/todo/delete-todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/use-action";
import { Todo } from "@prisma/client";
import { useParams } from "next/navigation";
import { FormTextField } from "@/app/components/Form/FormTextField";
import { FormTextAreaField } from "@/app/components/Form/FormTextAreaField";

interface AddTodoButtonProps {
  listId?: string;
  todo?: Todo;
}

export const TodoForm = ({ listId, todo }: AddTodoButtonProps) => {
  const params = useParams();
  const { execute: executeCreate, fieldErrors: fieldErrorsCreate } = useAction(
    createTodo,
    {
      onSuccess: (_) => {
        toast({
          title: "タスクが作成されました",
        });
      },
      onError: (error) => {
        toast({
          title: error,
        });
      },
    }
  );
  const handleCreateTodo = (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const listId = formData.get("listId") as string;
    const boardId = formData.get("boardId") as string;
    executeCreate({ title, description, listId, boardId });
  };

  const { execute: executeDelete } = useAction(deleteTodo, {
    onSuccess: (_) => {
      toast({
        title: "タスクが削除されました",
      });
    },
    onError: (error) => {
      toast({
        title: error,
      });
    },
  });
  const handleDeleteTodo = (formData: FormData) => {
    const todoId = formData.get("todoId") as string;
    const boardId = formData.get("boardId") as string;
    executeDelete({ boardId, todoId });
  };

  const { execute: executeUpdate, fieldErrors: fieldErrorsUpdate } = useAction(
    updateTodo,
    {
      onSuccess: (_) => {
        toast({ title: "タスクが更新されました" });
      },
      onError: (error) => {
        toast({ title: error });
      },
    }
  );

  const handleUpdateTodo = (formData: FormData) => {
    const todoId = formData.get("todoId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const boardId = formData.get("boardId") as string;
    executeUpdate({ boardId, todoId, title, description });
  };

  return (
    <form action={todo ? handleUpdateTodo : handleCreateTodo}>
      <input type="hidden" name="boardId" value={params.boardId} />
      <input type="hidden" name="listId" value={listId} />
      <input type="hidden" name="todoId" value={todo && todo.todoId} />
      <SheetHeader>
        <SheetTitle>タスクの{todo ? "編集" : "追加"}</SheetTitle>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <FormTextField
          name={"title"}
          defaultValue={todo?.title ?? ""}
          label="タイトル"
          errors={todo ? fieldErrorsUpdate : fieldErrorsCreate}
        />
        <FormTextAreaField
          name={"description"}
          defaultValue={todo?.description ?? ""}
          label="概要"
          errors={todo ? fieldErrorsUpdate : fieldErrorsCreate}
        />
      </div>
      <SheetFooter>
        {todo && <Button formAction={handleDeleteTodo}>削除</Button>}
        <Button type="submit">{todo ? "更新" : "登録"}</Button>
      </SheetFooter>
    </form>
  );
};
