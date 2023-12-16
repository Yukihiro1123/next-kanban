"use server";

import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { Todo } from "@prisma/client";

export async function updateTodoOrder(todoList: Todo[]) {
  "use server";
  let updatedTodo;
  try {
    console.log("OK");
    const transaction = todoList.map((todo) =>
      prisma.todo.update({
        where: {
          todoId: todo.todoId,
        },
        data: {
          order: todo.order,
        },
      })
    );

    updatedTodo = await prisma.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }
  revalidatePath(``);
  return { data: updatedTodo };
}
