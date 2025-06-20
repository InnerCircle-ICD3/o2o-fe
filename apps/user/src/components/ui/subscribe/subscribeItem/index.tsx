import StatusLabel from "@/components/common/statusLabel";
import type { SubscribeDetail } from "@/types/apis/subscribe.type";
import generateProductStatus from "@/utils/productStatus";
import Image from "next/image";
import Link from "next/link";
import * as style from "./subscribeItem.css";

interface SubscribeItemProps {
  subscribe: SubscribeDetail;
}

const SubscribeItem = (props: SubscribeItemProps) => {
  const { subscribe } = props;

  const { uiStatus, label } = generateProductStatus(subscribe.status, {
    quantity: subscribe.totalStockCount,
    stock: subscribe.totalStockCount,
  });

  return (
    <div className={style.container}>
      <Link href={`/stores/${subscribe.storeId}`} className={style.wrapper}>
        <div className={style.titleBox}>
          <h3 className={style.title}>{subscribe.storeName}</h3>
          <StatusLabel status={uiStatus}>{label}</StatusLabel>
        </div>

        <div className={style.infoBox}>
          <Image
            src={subscribe.mainImageUrl || "/images/thumb.png"}
            alt=""
            width={90}
            height={90}
            className={style.image}
          />

          <div className={style.info}>
            <p className={style.category}>{subscribe.foodCategory.join(" | ")}</p>
            <p className={style.description}>{subscribe.description}</p>
            {/* <div className={style.prices}>
              <p className={style.original}>
                {subscribe.originalPrice !== 0 && formatCurrency(subscribe.originalPrice)}
              </p>
              <p className={classNames(style.discount, globalStyle.primaryColor)}>
                {subscribe.discountedPrice !== 0 && `${formatCurrency(subscribe.discountedPrice)}~`}
              </p>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SubscribeItem;
