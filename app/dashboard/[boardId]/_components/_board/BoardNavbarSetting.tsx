import { Board } from "@prisma/client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { BoardForm } from "@/app/dashboard/_components/BoardForm";

interface BoardNavbarSettingProps {
  board: Board;
}
export const BoardNavbarSetting = ({ board }: BoardNavbarSettingProps) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <DialogTrigger>ボードの編集</DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BoardForm board={board} />
    </Dialog>
  );
};
