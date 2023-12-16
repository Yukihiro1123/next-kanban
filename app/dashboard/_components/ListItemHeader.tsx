import { List } from "@prisma/client";
import { AddTodoButton } from "./AddTodoButton";

interface ListItemHeaderProps {
  data: List;
}
export const ListItemHeader = ({ data }: ListItemHeaderProps) => {
  return (
    <div className="flex justify-between">
      <p className="pt-3 pl-3">{data.title}</p>
      <AddTodoButton listId={data.listId} />
    </div>
  );
};
