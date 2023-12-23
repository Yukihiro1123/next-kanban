"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { CreateTodo } from "./schema";
import { InputType, ReturnType } from "./types";
import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { title, description, listId, boardId } = data;
  let todo;
  try {
    const lastCard = await prisma.todo.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = lastCard ? lastCard.order + 1 : 1;
    const session = await getServerSession(authOptions);
    todo = await prisma.todo.create({
      data: {
        createdBy: {
          connect: {
            id: session!.user!.id,
          },
        },
        title: title,
        description: description ?? "",
        order: newOrder,
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
      error: "タスクの作成に失敗しました",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: todo };
};

export const createTodo = createSafeAction(CreateTodo, handler);
