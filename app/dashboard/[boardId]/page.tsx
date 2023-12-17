import prisma from "@/app/utils/db";
import AddListButton from "./_components/_list/AddListButton";
import { ListContainer } from "./_components/_list/ListContainer";

interface BoardIdPageProps {
  boardId: string;
}

const BoardIdPage = async ({ boardId }: BoardIdPageProps) => {
  const data = await prisma.list.findMany({
    where: {
      boardId,
    },
    include: {
      todos: true,
      board: true,
    },
  });
  return (
    <div className="p-5">
      <AddListButton />
      <ListContainer data={data} />
    </div>
  );
};

export default BoardIdPage;
