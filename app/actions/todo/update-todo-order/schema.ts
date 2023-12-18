import { z } from "zod";

export const UpdateTodoOrder = z.object({
  items: z.array(
    z.object({
      todoId: z.string(),
      title: z.string(),
      description: z.string(),
      order: z.number(),
      listId: z.string(),
      createdAt: z.date(),
    })
  ),
  boardId: z.string(),
});
