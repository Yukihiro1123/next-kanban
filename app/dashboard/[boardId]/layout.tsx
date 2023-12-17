import { notFound } from "next/navigation";

import prisma from "@/app/utils/db";
import { BoardNavbar } from "./_components/_board/BoardNavbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const board = await prisma.board.findUnique({
    where: {
      boardId: params.boardId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const board = await prisma.board.findUnique({
    where: {
      boardId: params.boardId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div>
      <BoardNavbar data={board} />
      <main>{children}</main>
    </div>
  );
};

export default BoardIdLayout;
