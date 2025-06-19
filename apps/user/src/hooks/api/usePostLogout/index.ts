import { postLogout } from "@/apis/ssr/account";
import { useMutation } from "@/hooks/api/utils/useMutation";

const usePostLogout = () => {
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      const result = await postLogout();
      if (result.success) {
        return result;
      }
      throw new Error(result.message ?? "로그아웃 실패");
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
