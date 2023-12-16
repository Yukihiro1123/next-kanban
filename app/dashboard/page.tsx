import prisma from "../utils/db";
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
  return <ListContainer data={list} />;
};

export default Dashboard;
