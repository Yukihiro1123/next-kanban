"use client";
import { updateTodo } from "@/app/actions/todo/update-todo";
import { createTodo } from "@/app/actions/todo/create-todo";
import { deleteTodo } from "@/app/actions/todo/delete-todo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/use-action";
import { Todo } from "@prisma/client";
import { useParams } from "next/navigation";
import { FormTextField } from "@/app/components/Form/FormTextField";
import { FormTextAreaField } from "@/app/components/Form/FormTextAreaField";
import React, { useState } from "react";

interface TodoFormProps {
  listId?: string;
  todo?: Todo;
  children: React.ReactNode;
}

export const TodoForm = ({ listId, todo, children }: TodoFormProps) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const { execute: executeCreate, fieldErrors: fieldErrorsCreate } = useAction(
    createTodo,
    {
      onSuccess: (_) => {
        setOpen(false);
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
      setOpen(false);
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
        setOpen(false);
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
    <Sheet modal={false} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <form action={todo ? handleUpdateTodo : handleCreateTodo}>
          <input type="hidden" name="boardId" value={params.boardId} />
          <input type="hidden" name="listId" value={listId} />
          <input type="hidden" name="todoId" value={todo && todo.todoId} />
          <SheetHeader>
            {!todo && <SheetTitle>タスクの追加</SheetTitle>}
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
      </SheetContent>
    </Sheet>
  );
};
