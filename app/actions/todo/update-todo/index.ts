"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateTodo } from "./schema";
import { InputType, ReturnType } from "./types";
import prisma from "@/app/utils/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  let todo;
  const { todoId, boardId, ...values } = data;
  try {
    todo = await prisma.todo.update({
      where: {
        todoId,
      },
      data: {
        ...values,
      },
    });
  } catch (error) {
    return {
      error: "タスクの更新に失敗しました",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: todo };
};

export const updateTodo = createSafeAction(UpdateTodo, handler);
