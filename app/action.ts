"use server";

import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { List, Todo } from "@prisma/client";

export async function addBoard(formData: FormData) {
  "use server";
  try {
    await prisma.board.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to add list.",
    };
  }
  revalidatePath("dashboard");
}

export async function updateBoard(formData: FormData) {
  "use server";
  try {
    await prisma.board.update({
      where: {
        boardId: formData.get("boardId") as string,
      },
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to add list.",
    };
  }
  revalidatePath("dashboard");
}

export async function deleteBoard(boardId: string) {
  "use server";
  try {
    await prisma.board.delete({
      where: {
        boardId,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete board.",
    };
  }
  revalidatePath("dashboard");
}

export async function addList(formData: FormData) {
  "use server";
  try {
    await prisma.list.create({
      data: {
        title: formData.get("title") as string,
        order: 1,
        board: {
          connect: {
            boardId: "3b51d8d4-e964-4b77-916f-d308beacd315",
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to add list.",
    };
  }
  revalidatePath("dashboard");
}

export async function editList(formData: FormData) {
  "use server";
  try {
    await prisma.list.update({
      where: {
        listId: formData.get("listId") as string,
      },
      data: {
        title: formData.get("title") as string,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to add list.",
    };
  }
  revalidatePath("dashboard");
}

export async function deleteList(listId: string) {
  "use server";
  try {
    await prisma.list.delete({
      where: {
        listId,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to add list.",
    };
  }
  revalidatePath("dashboard");
}

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
