"use client";

import { createBoard } from "@/app/actions/board/create-board";
import { deleteBoard } from "@/app/actions/board/delete-board";
import { updateBoard } from "@/app/actions/board/update-board";
import { FormTextAreaField } from "@/app/components/Form/FormTextAreaField";
import { FormTextField } from "@/app/components/Form/FormTextField";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface BoardFormProps {
  board?: Board;
  children: React.ReactNode;
}

export const BoardForm = ({ board, children }: BoardFormProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { execute: executeCreate, fieldErrors: fieldErrorsCreate } = useAction(
    createBoard,
    {
      onSuccess: (data) => {
        setOpen(false);
        toast({
          title: "ボードが作成されました",
        });
        router.push(`/dashboard/${data.boardId}`);
      },
      onError: (error) => {
        toast({
          title: error,
        });
      },
    }
  );
  const handleAddBoard = (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    executeCreate({ title, description });
  };

  const { execute: executeUpdate, fieldErrors: fieldErrorsUpdate } = useAction(
    updateBoard,
    {
      onSuccess: (data) => {
        setOpen(false);
        toast({
          title: "ボードが更新されました",
        });
        router.push(`/dashboard/${data.boardId}`);
      },
      onError: (error) => {
        toast({
          title: error,
        });
      },
    }
  );
  const handleUpdateBoard = (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const boardId = formData.get("boardId") as string;
    executeUpdate({ title, description, boardId });
  };
  const { execute: executeDelete } = useAction(deleteBoard, {
    onSuccess: (_) => {
      setOpen(false);
      router.push(`/dashboard`);
      toast({
        title: "ボードが削除されました",
      });
    },
    onError: (error) => {
      toast({
        title: error,
      });
    },
  });
  const handleDeleteBoard = (formData: FormData) => {
    const boardId = formData.get("boardId") as string;
    executeDelete({ boardId });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {!board && <DialogTitle>ボードを追加</DialogTitle>}
        </DialogHeader>
        <form action={board ? handleUpdateBoard : handleAddBoard}>
          <input type="hidden" name="boardId" value={board?.boardId} />
          <div className="grid gap-4 py-4">
            <FormTextField
              name={"title"}
              defaultValue={board?.title ?? ""}
              label="タイトル"
              errors={board ? fieldErrorsUpdate : fieldErrorsCreate}
            />
            <FormTextAreaField
              name={"description"}
              defaultValue={board?.description ?? ""}
              label="概要"
              errors={board ? fieldErrorsUpdate : fieldErrorsCreate}
            />
          </div>
          <DialogFooter>
            <Button type="submit">{board ? "更新" : "登録"}</Button>
            {board && <Button formAction={handleDeleteBoard}>削除</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
