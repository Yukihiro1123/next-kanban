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
        <h3 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {data.title}
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {data.description}
        </p>
      </div>
      <Button variant="ghost">
        <MoreHorizontalIcon />
      </Button>
    </div>
  );
};
