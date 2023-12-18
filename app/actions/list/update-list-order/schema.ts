import { z } from "zod";

export const UpdateListOrder = z.object({
  items: z.array(
    z.object({
      listId: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  boardId: z.string(),
});
