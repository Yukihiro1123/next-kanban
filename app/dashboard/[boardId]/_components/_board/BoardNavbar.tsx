import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { MoreHorizontalIcon } from "lucide-react";

interface BoardNavbarProps {
  data: Board;
}

export const BoardNavbar = ({ data }: BoardNavbarProps) => {
  return (
    <div className="flex justify-between">
      <div className="pl-3">
        <p>{data.title}</p>
        <p>{data.description}</p>
      </div>
      <Button variant="ghost">
        <MoreHorizontalIcon />
      </Button>
    </div>
  );
};
