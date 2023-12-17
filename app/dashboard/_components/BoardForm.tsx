"use client";
import { createBoard } from "@/app/actions/board/create-board";
import { deleteBoard } from "@/app/actions/board/delete-board";
import { updateBoard } from "@/app/actions/board/update-board";
import { FormError } from "@/app/components/FormError";

import { Button } from "@/components/ui/button";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const handleDeleteBoard = (boardId: string) => {
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              タイトル
            </Label>
            <Input
              name="title"
              className="col-span-3"
              defaultValue={board?.title}
            />
            <FormError
              id="title"
              errors={board ? fieldErrorsUpdate : fieldErrorsCreate}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              概要
            </Label>
            <Textarea
              name="description"
              className="col-span-3"
              defaultValue={board?.description}
            />
            <FormError
              id="description"
              errors={board ? fieldErrorsUpdate : fieldErrorsCreate}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{board ? "更新" : "登録"}</Button>

          {board && (
            <Button onClick={() => handleDeleteBoard(board.boardId)}>
              削除
            </Button>
          )}
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
