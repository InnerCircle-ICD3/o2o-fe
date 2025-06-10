import { apiClient } from "@/apis/client";
import { useRouter } from "next/navigation";
import { useMutation } from "../utils/useMutation";

interface OrderBody {
  storeId: string;
  orderItems: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
}

interface OrderResponse {
  orderId: string;
}

const createOrder = (body: OrderBody, customerId = 1) => {
  // todo customerId = 유저 정보에서 받아와야 함 (로그인 기능 완료되면 붙일 수 있을듯)
  return apiClient.post<OrderResponse>(`orders?customerId=${customerId}`, body);
};

const usePostOrder = () => {
  const mutation = useMutation({
    mutationFn: createOrder,
  });
  const router = useRouter();

  const submitOrder = (body: OrderBody) => {
    return mutation.mutate(body, {
      onSuccess: (res) => {
        router.push(`/orders/${res.data.orderId}`);
      },
      onError: (error) => {
        console.error("Order submission failed:", error);
      },
    });
  };

  return submitOrder;
};

export default usePostOrder;
