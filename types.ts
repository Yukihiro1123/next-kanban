import { List, Todo } from "@prisma/client";

export type ListWithTodos = List & { todos: Todo[] };

export type TodoWithList = Todo & { list: List };
