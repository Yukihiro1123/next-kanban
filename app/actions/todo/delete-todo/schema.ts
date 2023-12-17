import { z } from "zod";

export const DeleteTodo = z.object({
  todoId: z.string(),
  boardId: z.string(),
});
