import prisma from "../utils/db";
import { TodoContainer } from "./_components/TodoContainer";

export async function getTodo() {
  const data = await prisma.todo.findMany();
  console.log(data);
  return data;
}

const Dashboard = async () => {
  const todos = await getTodo();
  return <TodoContainer todoList={todos} />;
};

export default Dashboard;
