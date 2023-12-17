"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateListOrder } from "./schema";
import { InputType, ReturnType } from "./types";
import prisma from "@/app/utils/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { items, boardId } = data;
  let lists;

  try {
    const transaction = items.map((list) =>
      prisma.list.update({
        where: {
          listId: list.listId,
          board: {
            boardId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await prisma.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
