import { getServerSession } from "next-auth";
import prisma from "../utils/db";
import { BoardContainer } from "./_components/BoardContainer";
import { authOptions } from "../utils/auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const data = await prisma.board.findMany({
    where: {
      userId: session!.user!.id,
    },
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
