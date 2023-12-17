import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { ListForm } from "./ListForm";
import { List } from "@prisma/client";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditListButtonProps {
  list: List;
}
export const EditListButton = ({ list }: EditListButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <ListForm list={list} />
    </Dialog>
  );
};
