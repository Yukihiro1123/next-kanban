import { z } from "zod";

export const DeleteBoard = z.object({
  boardId: z.string(),
});
