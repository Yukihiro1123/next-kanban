"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateTodoOrder } from "./schema";
import { InputType, ReturnType } from "./types";
import prisma from "@/app/utils/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { boardId, items } = data;
  let updatedTodos;

  try {
    const transaction = items.map((todo) =>
      prisma.todo.update({
        where: {
          todoId: todo.todoId,
          list: {
            board: {
              boardId,
            },
          },
        },
        data: {
          order: todo.order,
          listId: todo.listId,
        },
      })
    );

    updatedTodos = await prisma.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updatedTodos };
};

export const updateTodoOrder = createSafeAction(UpdateTodoOrder, handler);
