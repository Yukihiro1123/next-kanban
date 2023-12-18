import { z } from "zod";

export const CreateList = z.object({
  title: z
    .string({
      required_error: "必須入力項目です",
    })
    .min(3, {
      message: "3文字以上20字以内で入力してください",
    })
    .max(20, {
      message: "3文字以上20字以内で入力してください",
    }),
  boardId: z.string(),
});
