"use client";
import { createBoard } from "@/app/actions/board/create-board";
import { deleteBoard } from "@/app/actions/board/delete-board";
import { updateBoard } from "@/app/actions/board/update-board";
import { FormTextAreaField } from "@/app/components/Form/FormTextAreaField";
import { FormTextField } from "@/app/components/Form/FormTextField";

import { Button } from "@/components/ui/button";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";

import { useRouter } from "next/navigation";

interface BoardFormProps {
  board?: Board;
}

export const BoardForm = ({ board }: BoardFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { execute: executeCreate, fieldErrors: fieldErrorsCreate } = useAction(
    createBoard,
    {
      onSuccess: (data) => {
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
      toast({
        title: "ボードが削除されました",
      });
      router.push(`/dashboard`);
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
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>ボードを{board ? "編集" : "追加"}</DialogTitle>
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
  );
};
