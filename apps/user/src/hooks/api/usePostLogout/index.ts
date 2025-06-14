import { postLogout } from "@/apis/ssr/customer";
import { useMutation } from "@/hooks/api/utils/useMutation";
import { useQueryClient } from "@tanstack/react-query";

const usePostLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    mutate,
    mutateAsync,
    isPending,
    isError,
    error,
  };
};

export default usePostLogout;
