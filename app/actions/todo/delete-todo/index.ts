"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteTodo } from "./schema";
import { InputType, ReturnType } from "./types";
import prisma from "@/app/utils/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { todoId, boardId } = data;
  let todo;
  try {
    todo = await prisma.todo.delete({
      where: {
        todoId,
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: todo };
};

export const deleteTodo = createSafeAction(DeleteTodo, handler);
