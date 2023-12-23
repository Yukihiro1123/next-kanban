"use server";

import prisma from "@/app/utils/db";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { title, boardId } = data;
  let list;
  try {
    const lastList = await prisma.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;
    const session = await getServerSession(authOptions);
    list = await prisma.list.create({
      data: {
        createdBy: { connect: { id: session!.user!.id } },
        title: title,
        order: newOrder,
        board: {
          connect: {
            boardId,
          },
        },
      },
    });
  } catch (error) {
    return {
      error: "リストの追加に失敗しました",
    };
  }
  revalidatePath(`/dashboard/${list.boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
