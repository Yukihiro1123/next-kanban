import { z } from "zod";

export const UpdateTodo = z.object({
  title: z
    .string({
      required_error: "必須入力項目です",
    })
    .min(3, {
      message: "短すぎます",
    })
    .max(20, {
      message: "入力可能な文字数を超えています",
    }),
  description: z.string().optional(),
  todoId: z.string(),
  boardId: z.string(),
});
