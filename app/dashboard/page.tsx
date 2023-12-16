import prisma from "../utils/db";

import AddListButton from "./_components/AddListButton";
import { ListContainer } from "./_components/ListContainer";

export async function getList() {
  const data = await prisma.list.findMany({
    include: {
      todos: true,
    },
  });
  return data;
}

const Dashboard = async () => {
  const list = await getList();
  return (
    <div className="p-5">
      <AddListButton />
      <ListContainer data={list} />
    </div>
  );
};

export default Dashboard;
