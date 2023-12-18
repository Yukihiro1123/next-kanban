import { BoardForm } from "@/app/dashboard/_components/BoardForm";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Board } from "@prisma/client";
import { MoreHorizontalIcon } from "lucide-react";

interface BoardNavbarProps {
  data: Board;
}

export const BoardNavbar = ({ data }: BoardNavbarProps) => {
  return (
    <div className="flex justify-between px-3">
      <div>
        <h3 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {data.title}
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {data.description}
        </p>
      </div>
      <BoardForm board={data}>
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
      </BoardForm>
    </div>
  );
};
