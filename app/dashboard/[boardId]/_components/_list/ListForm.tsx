import { addList, deleteList, editList } from "@/app/action";
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
import { List } from "@prisma/client";

interface ListFormProps {
  list?: List;
}

export const ListForm = ({ list }: ListFormProps) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>リストを{list ? "編集" : "追加"}</DialogTitle>
      </DialogHeader>
      <form action={list ? editList : addList}>
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
          <DialogClose asChild>
            <Button type="submit">{list ? "更新" : "登録"}</Button>
          </DialogClose>
          {list && (
            <DialogClose asChild>
              <Button onClick={() => deleteList(list.listId)}>削除</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
