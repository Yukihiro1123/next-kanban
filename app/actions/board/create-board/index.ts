"use server";

import prisma from "@/app/utils/db";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { title, description } = data;
  let board;
  try {
    const session = await getServerSession(authOptions);
    board = await prisma.board.create({
      data: {
        createdBy: {
          connect: {
            id: session!.user!.id,
          },
        },
        title: title,
        description: description ?? "",
      },
    });
  } catch (error) {
    return {
      error: "リストの追加に失敗しました",
    };
  }
  revalidatePath(`/board/${board.boardId}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
