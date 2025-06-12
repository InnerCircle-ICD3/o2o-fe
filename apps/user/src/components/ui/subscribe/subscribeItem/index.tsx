import StatusLabel from "@/components/common/statusLabel";
import Subscribe from "@/components/common/subscribe";
import { userInfoStore } from "@/stores/userInfoStore";
import * as globalStyle from "@/styles/global.css";
import type { SubscribeDetail } from "@/types/apis/subscribe.type";
import { formatCurrency } from "@/utils/format";
import generateProductStatus from "@/utils/productStatus";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import * as style from "./subscribeItem.css";

interface SubscribeItemProps {
  subscribe: SubscribeDetail;
}

const SubscribeItem = (props: SubscribeItemProps) => {
  const { subscribe } = props;
  const { user } = userInfoStore();
  const isLogin = !!user;

  const { status, label } = generateProductStatus(subscribe.totalStockCount);

  return (
    <div className={style.container}>
      {isLogin && (
        <Subscribe isFavorite={true} storeId={subscribe.storeId} customerId={user.customerId} />
      )}
      <Link href={`/stores/${subscribe.storeId}`} className={style.wrapper}>
        <div className={style.titleBox}>
          <h3 className={style.title}>{subscribe.storeName}</h3>
          <StatusLabel status={status}>{label}</StatusLabel>
        </div>

        <div className={style.infoBox}>
          <Image
            src={subscribe.mainImageUrl}
            alt="#"
            width={90}
            height={90}
            className={style.image}
          />

          <div className={style.info}>
            <p className={style.category}>{subscribe.foodCategory.join(" | ")}</p>
            <p className={style.description}>
              {subscribe.description} 길다 길어~길다 길어~길다 길어~길다 길어~
            </p>
            <div className={style.prices}>
              <p className={style.original}>{formatCurrency(subscribe.originalPrice)}</p>
              <p className={classNames(style.discount, globalStyle.primaryColor)}>
                {formatCurrency(subscribe.discountedPrice)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SubscribeItem;
