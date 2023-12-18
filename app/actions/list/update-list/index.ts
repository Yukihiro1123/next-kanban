"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateList } from "./schema";
import { InputType, ReturnType } from "./types";
import prisma from "@/app/utils/db";
const handler = async (data: InputType): Promise<ReturnType> => {
  const { title, listId, boardId } = data;
  let list;

  try {
    list = await prisma.list.update({
      where: {
        listId,
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "リストの更新に失敗しました",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
