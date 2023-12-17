import { ActionState } from "@/lib/create-safe-action";
import { CreateTodo } from "./schema";
import { Todo } from "@prisma/client";
import { z } from "zod";

export type InputType = z.infer<typeof CreateTodo>;
export type ReturnType = ActionState<InputType, Todo>;
