"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteList } from "./schema";
import { InputType, ReturnType } from "./types";
import prisma from "@/app/utils/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { listId, boardId } = data;
  let list;
  try {
    list = await prisma.list.delete({
      where: {
        listId,
        boardId,
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/dashboard/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
