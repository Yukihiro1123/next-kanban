import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { BoardForm } from "./BoardForm";

export const AddBoardButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          role="button"
          className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
        >
          <p className="text-sm">新しいボードを作成</p>
        </div>
      </DialogTrigger>
      <BoardForm />
    </Dialog>
  );
};
