import prisma from "@/app/utils/db";
import AddListButton from "./_components/_list/AddListButton";
import { ListContainer } from "./_components/_list/ListContainer";

interface BoardIdPageProps {
  params: { boardId: string };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const data = await prisma.list.findMany({
    where: {
      boardId: params.boardId,
    },
    include: {
      todos: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-5">
      <AddListButton />
      <ListContainer data={data} boardId={params.boardId} />
    </div>
  );
};

export default BoardIdPage;
