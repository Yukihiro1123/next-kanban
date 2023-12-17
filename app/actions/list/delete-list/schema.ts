import { z } from "zod";

export const DeleteList = z.object({
  listId: z.string(),
  boardId: z.string(),
});
