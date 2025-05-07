import { apiClient } from "@/app/services/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function useTodos() {
  const queryClient = useQueryClient();

  // 할 일 목록 가져오기
  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => apiClient.get<Todo[]>("/todos"),
  });

  // 새로운 할 일 추가
  const addTodoMutation = useMutation({
    mutationFn: (title: string) => apiClient.post<Todo>("/todos", { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // 할 일 완료 상태 토글
  const toggleTodoMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      apiClient.put<Todo>(`/todos/${id}`, { completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // 할 일 삭제
  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => apiClient.delete(`/todos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos,
    isLoading,
    error,
    addTodo: addTodoMutation.mutate,
    toggleTodo: toggleTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
  };
}
