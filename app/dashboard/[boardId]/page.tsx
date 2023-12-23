import prisma from "@/app/utils/db";
import { ListContainer } from "./_components/_list/ListContainer";
import { ListForm } from "./_components/_list/ListForm";
import { Button } from "@/components/ui/button";
import { PlusSquareIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

interface BoardIdPageProps {
  params: { boardId: string };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const session = await getServerSession(authOptions);
  const data = await prisma.list.findMany({
    where: {
      boardId: params.boardId,
      createdBy: {
        id: session!.user!.id,
      },
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
      <ListForm>
        <Button>
          <PlusSquareIcon className="mr-2 h-4 w-4" /> 新しいリストを追加
        </Button>
      </ListForm>
      <ListContainer data={data} boardId={params.boardId} />
    </div>
  );
};

export default BoardIdPage;
