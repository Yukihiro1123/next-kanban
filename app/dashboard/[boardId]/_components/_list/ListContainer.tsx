"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ListItem } from "./ListItem";
import { ListWithTodos } from "@/types";

import { useAction } from "@/hooks/use-action";
import { toast } from "@/components/ui/use-toast";
import { updateListOrder } from "@/app/actions/list/update-list-order";
import { updateTodoOrder } from "@/app/actions/todo/update-todo-order";

interface ListContainerProps {
  data: ListWithTodos[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast({ title: "リストを更新しました" });
    },
    onError: (error) => {
      toast({ title: error });
    },
  });
  const { execute: executeUpdateTodoOrder } = useAction(updateTodoOrder, {
    onSuccess: () => {
      toast({ title: "タスクを更新しました" });
    },
    onError: (error) => {
      toast({ title: error });
    },
  });
  const onDragEnd = async (result: any) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // User moves a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items);
      //server actions
      executeUpdateListOrder({ items, boardId });
    }
    // User moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData];
      // Source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.listId === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.listId === destination.droppableId
      );
      if (!sourceList || !destList) {
        return;
      }
      // Check if todos exists on the sourceList
      if (!sourceList.todos) {
        sourceList.todos = [];
      }
      // Check if todos exists on the destList
      if (!destList.todos) {
        destList.todos = [];
      }
      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedTodos = reorder(
          sourceList.todos,
          source.index,
          destination.index
        );
        reorderedTodos.forEach((todo, idx) => {
          todo.order = idx;
        });

        sourceList.todos = reorderedTodos;
        setOrderedData(newOrderedData);
        executeUpdateTodoOrder({ items: reorderedTodos, boardId });
        // User moves the card to another list
      } else {
        // Remove card from the source list
        const [movedTodo] = sourceList.todos.splice(source.index, 1);
        // Assign the new listId to the moved card
        movedTodo.listId = destination.droppableId;
        // Add todo to the destination list
        destList.todos.splice(destination.index, 0, movedTodo);
        sourceList.todos.forEach((todo, idx) => {
          todo.order = idx;
        });
        // Update the order for each card in the destination list
        destList.todos.forEach((todo, idx) => {
          todo.order = idx;
        });
        setOrderedData(newOrderedData);
        executeUpdateTodoOrder({ items: destList.todos, boardId });
      }
    }
  };

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full py-3"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.listId} index={index} data={list} />;
            })}
            {provided.placeholder}
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
