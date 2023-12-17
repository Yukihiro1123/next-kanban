"use server";

import prisma from "@/app/utils/db";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { title, description } = data;
  let board;
  try {
    board = await prisma.board.create({
      data: {
        title: title,
        description: description ?? "",
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to add list.",
    };
  }
  revalidatePath(`/board/${board.boardId}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
