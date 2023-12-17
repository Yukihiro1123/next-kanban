import { List } from "@prisma/client";
import { EditListButton } from "./EditListButton";

interface ListItemHeaderProps {
  data: List;
}
export const ListItemHeader = ({ data }: ListItemHeaderProps) => {
  return (
    <div className="flex justify-between">
      <p className="pt-3 pl-3">{data.title}</p>
      <div>
        <EditListButton list={data} />
      </div>
      {/* <ListItemSettingButton list={data} /> */}
    </div>
  );
};
