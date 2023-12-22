import prisma from "../utils/db";
import { BoardContainer } from "./_components/BoardContainer";

const Dashboard = async () => {
  const data = await prisma.board.findMany({
    include: {
      lists: true,
    },
  });
  return (
    <div className="p-5">
      <BoardContainer boards={data} />
    </div>
  );
};

export default Dashboard;
