"use server";

import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { List, Todo } from "@prisma/client";

export async function addTodo(formData: FormData) {
  "use server";
  try {
    const listId = formData.get("listId") as string;
    await prisma.todo.create({
      data: {
        title: formData.get("title") as string,
        overview: formData.get("overview") as string,
        createdAt: new Date(),
        order: 1,
        list: {
          connect: {
            listId,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to add todo.",
    };
  }
  revalidatePath("dashboard");
}

export async function updateTodo(formData: FormData) {
  "use server";
  try {
    const todoId = formData.get("todoId") as string;
    await prisma.todo.update({
      where: {
        todoId: todoId,
      },
      data: {
        title: formData.get("title") as string,
        overview: formData.get("overview") as string,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update todo.",
    };
  }
  revalidatePath("dashboard");
}

export async function deleteTodo(todoId: string) {
  "use server";
  try {
    await prisma.todo.delete({
      where: {
        todoId,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete todo.",
    };
  }
  revalidatePath("dashboard");
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
