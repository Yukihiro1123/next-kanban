import prisma from "../utils/db";
import { AddBoardButton } from "./_components/AddBoardButton";
import { BoardContainer } from "./_components/BoardContainer";

export async function getBoards() {
  const data = await prisma.board.findMany({
    include: {
      lists: true,
    },
  });
  return data;
}

const Dashboard = async () => {
  const boards = await getBoards();
  return (
    <div className="p-5">
      <BoardContainer boards={boards} />
    </div>
  );
};

export default Dashboard;
