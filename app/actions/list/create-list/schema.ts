import { z } from "zod";

export const CreateList = z.object({
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
  boardId: z.string(),
});
