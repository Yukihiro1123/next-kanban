import { getServerSession } from "next-auth";
import prisma from "../utils/db";
import { BoardContainer } from "./_components/BoardContainer";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
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
