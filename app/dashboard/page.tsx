import prisma from "../utils/db";

export async function getTodo() {
  const data = await prisma.todo.findMany();
  console.log(data);
  return data;
}

const Dashboard = async () => {
  const todos = await getTodo();
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.todoId}>
          <p>{todo.title}</p>
          <p>{todo.overview}</p>
          <p>{todo.createdAt.toString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
