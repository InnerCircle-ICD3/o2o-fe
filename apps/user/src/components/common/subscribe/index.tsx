import useSubscribe from "@/hooks/api/useSubscribe";
import Image from "next/image";
import * as style from "./subscribe.css";

interface SubscribeProps {
  isFavorite: boolean;
  storeId: number;
  customerId: number;
}

const Subscribe = (props: SubscribeProps) => {
  const { isFavorite, storeId, customerId } = props;
  const toggleSubscribe = useSubscribe();

  return (
    <button
      type={"button"}
      className={style.container}
      onClick={() => toggleSubscribe(storeId, customerId)}
    >
      <Image
        src={isFavorite ? "/icons/subscribe_on.svg" : "/icons/subscribe_off.svg"}
        alt={isFavorite ? "찜하기 취소" : "찜하기"}
        width={16}
        height={16}
      />
    </button>
  );
};

export default Subscribe;
