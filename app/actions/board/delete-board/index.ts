"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteBoard } from "./schema";
import { InputType, ReturnType } from "./types";
import prisma from "@/app/utils/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { boardId } = data;

  try {
    await prisma.board.delete({
      where: {
        boardId,
      },
    });
  } catch (error) {
    return {
      error: "ボードの削除に失敗しました",
    };
  }

  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
