import { List } from "@prisma/client";
import { ListForm } from "./ListForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface ListItemHeaderProps {
  data: List;
}
export const ListItemHeader = ({ data }: ListItemHeaderProps) => {
  return (
    <div className="flex justify-between">
      <p className="pt-3 pl-3">{data.title}</p>
      <div>
        <ListForm list={data}>
          <Button variant="ghost" size="icon">
            <Pencil className="w-4 h-4" />
          </Button>
        </ListForm>
      </div>
      {/* <ListItemSettingButton list={data} /> */}
    </div>
  );
};
