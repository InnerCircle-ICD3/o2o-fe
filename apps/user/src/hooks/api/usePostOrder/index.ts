import { createOrder } from "@/apis/ssr/orders";
import type { CreateOrderRequest } from "@/types/apis/order.type";
import { useRouter } from "next/navigation";
import { useMutation } from "../utils/useMutation";

const usePostOrder = () => {
  const mutation = useMutation({
    mutationFn: createOrder,
  });
  const router = useRouter();

  const submitOrder = (body: CreateOrderRequest) => {
    return mutation.mutate(body, {
      onSuccess: (res) => {
        router.push(`/orders/${res.data.id}`);
      },
      onError: (error) => {
        if (error.code === "O005") {
          const data = error.data as { orderIds: number[] };
          const order = data.orderIds[0];

          return router.push(`/orders/${order}`);
        }
      },
    });
  };

  return submitOrder;
};

export default usePostOrder;
