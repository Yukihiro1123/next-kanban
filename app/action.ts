"use server";

import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { List, Todo } from "@prisma/client";

export async function updateListOrder(list: List[]) {
  "use server";
  let updateList;
  try {
    const transaction = list.map((todo) =>
      prisma.list.update({
        where: {
          listId: todo.listId,
        },
        data: {
          order: todo.order,
        },
      })
    );
    updateList = await prisma.$transaction(transaction);
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to reorder.",
    };
  }
  revalidatePath("dashboard");
  return { data: updateList };
}

export async function updateTodoOrder(todoList: Todo[]) {
  "use server";
  let updatedTodo;
  try {
    const transaction = todoList.map((todo) =>
      prisma.todo.update({
        where: {
          todoId: todo.todoId,
          //   list: {
          //     board: {
          //         boardId: boardId,
          //     }
          //   }
        },
        data: {
          order: todo.order,
          listId: todo.listId,
        },
      })
    );

    updatedTodo = await prisma.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }
  revalidatePath("dashboard");
  return { data: updatedTodo };
}
