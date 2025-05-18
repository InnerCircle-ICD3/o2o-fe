"use client";

import Button from "@/components/common/button";
import * as globalStyle from "@/styles/global.css";
import { useRouter } from "next/navigation";

interface ReserveProps {
  id: string;
}

const Reserve = (props: ReserveProps) => {
  const { id } = props;
  const router = useRouter();

  const handleSubmit = () => {
    router.replace(`/orders/${id}/success`);
  };

  return (
    <div className={globalStyle.innerPadding}>
      <Button status={"primary"} type={"button"} onClick={handleSubmit}>
        예약 대기하기
      </Button>
    </div>
  );
};

export default Reserve;
