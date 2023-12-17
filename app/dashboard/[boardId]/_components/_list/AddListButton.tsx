import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusSquareIcon } from "lucide-react";
import { ListForm } from "./ListForm";

const AddListButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusSquareIcon className="mr-2 h-4 w-4" /> 新しいリストを追加
        </Button>
      </DialogTrigger>
      <ListForm />
    </Dialog>
  );
};

export default AddListButton;
