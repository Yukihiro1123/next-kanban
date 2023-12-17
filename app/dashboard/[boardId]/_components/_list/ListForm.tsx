"use client";

import { createList } from "@/app/actions/list/create-list";
import { deleteList } from "@/app/actions/list/delete-list";
import { updateList } from "@/app/actions/list/update-list";
import { FormTextField } from "@/app/components/Form/FormTextField";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const handleDeleteList = (formData: FormData) => {
    const boardId = formData.get("boardId") as string;
    const listId = formData.get("listId") as string;
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
          <FormTextField
            name={"title"}
            defaultValue={list?.title ?? ""}
            label="タイトル"
            errors={list ? fieldErrorsUpdate : fieldErrorsCreate}
          />
        </div>
        <DialogFooter>
          <Button type="submit">{list ? "更新" : "登録"}</Button>
          {list && <Button formAction={handleDeleteList}>削除</Button>}
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
