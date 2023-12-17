"use server";

import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateBoard } from "./schema";
import { InputType, ReturnType } from "./types";
import prisma from "@/app/utils/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { title, description, boardId } = data;
  let board;

  try {
    board = await prisma.board.update({
      where: {
        boardId,
      },
      data: {
        title,
        description,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath("/dashboard");
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
