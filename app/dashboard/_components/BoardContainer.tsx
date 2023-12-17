import { Board } from "@prisma/client";
import Link from "next/link";
import { AddBoardButton } from "./AddBoardButton";

interface BoardContainerProps {
  boards: Board[];
}

export const BoardContainer = ({ boards }: BoardContainerProps) => {
  return (
    <div className="space-y-4">
      <div>Your Boards</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.boardId}
            href={`/dashboard/${board.boardId}`}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <AddBoardButton />
      </div>
    </div>
  );
};
