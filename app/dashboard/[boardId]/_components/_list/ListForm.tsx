"use client";

import { createList } from "@/app/actions/list/create-list";
import { deleteList } from "@/app/actions/list/delete-list";
import { updateList } from "@/app/actions/list/update-list";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { useParams } from "next/navigation";

interface ListFormProps {
  list?: List;
}

export const ListForm = ({ list }: ListFormProps) => {
  const params = useParams();
  const { execute: executeCreate, fieldErrors: fieldErrorsCreate } = useAction(
    createList,
    {
      onSuccess: (_) => {
        toast({
          title: "リストが作成されました",
        });
      },
      onError: (error) => {
        toast({
          title: error,
        });
      },
    }
  );
  const handleUpdateList = (formData: FormData) => {
    const title = formData.get("title") as string;
    const listId = formData.get("listId") as string;
    const boardId = formData.get("boardId") as string;
    console.log(title, boardId);
    executeUpdate({ title, listId, boardId });
  };

  const { execute: executeUpdate, fieldErrors: fieldErrorsUpdate } = useAction(
    updateList,
    {
      onSuccess: (_) => {
        toast({
          title: "リストが作成されました",
        });
      },
      onError: (error) => {
        toast({
          title: error,
        });
      },
    }
  );
  const handleAddList = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    console.log(title, boardId);
    executeCreate({ title, boardId });
  };

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (_) => {
      toast({
        title: "リストが削除されました",
      });
    },
    onError: (error) => {
      toast({
        title: error,
      });
    },
  });
  const handleDeleteList = (boardId: string, listId: string) => {
    executeDelete({ boardId, listId });
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>リストを{list ? "編集" : "追加"}</DialogTitle>
      </DialogHeader>

      <form action={list ? handleUpdateList : handleAddList}>
        <input type="hidden" name="boardId" value={params.boardId} />
        <input type="hidden" name="listId" value={list?.listId} />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              タイトル
            </Label>
            <Input
              name="title"
              className="col-span-3"
              defaultValue={list?.title}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{list ? "更新" : "登録"}</Button>

          {list && (
            <DialogClose asChild>
              <Button
                onClick={() => handleDeleteList(list.boardId, list.listId)}
              >
                削除
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
