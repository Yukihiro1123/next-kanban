import { List } from "@prisma/client";
import { EditListButton } from "./EditListButton";

interface ListItemHeaderProps {
  data: List;
}
export const ListItemHeader = ({ data }: ListItemHeaderProps) => {
  return (
    <div className="flex justify-between">
      <p className="pt-3 pl-3">{data.title}</p>
      <EditListButton list={data} />
      {/* <ListItemSettingButton list={data} /> */}
    </div>
  );
};
