import { List, Todo } from "@prisma/client";

export type ListWithTodos = List & { todos: Todo[] };

export type TodoWithList = Todo & { list: List };

import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}
