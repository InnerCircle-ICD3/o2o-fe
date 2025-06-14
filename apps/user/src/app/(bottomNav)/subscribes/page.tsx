"use client";

import ErrorUi from "@/components/common/errorUi";
import VirtualScroll, { VirtualItem } from "@/components/common/virtualScroll";
import RequireLogin from "@/components/ui/my-orders/requireLogin";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import SubscribeItem from "@/components/ui/subscribe/subscribeItem";
import useSubscribeList from "@/hooks/api/useSubscribeList";
import { userInfoStore } from "@/stores/userInfoStore";
import * as style from "./subscribes.css";

const Page = () => {
  const { user } = userInfoStore();
  const isLogin = !!user;
  const {
    data: subscribes,
    error,
    isError,
    isLoading,
    fetchNextPage,
  } = useSubscribeList(1, isLogin);

  if (!isLogin) {
    return <RequireLogin text="찜" />;
  }

  if (isError) {
    return <ErrorUi message={error?.message} />;
  }

  const contents =
    subscribes?.pages.flatMap((page) => (page.success ? page.data.contents : [])) || [];

  return (
    <div className={style.container}>
      {isLoading ? (
        <SkeletonStoreCard imagePosition="left" />
      ) : contents.length === 0 ? (
        <ErrorUi type={"subscribe"} message="찜한 상품이 없습니다." />
      ) : (
        <VirtualScroll
          overscan={3}
          heights={{
            "subscribe-item": {
              aspectRatio: 388 / 190,
            },
          }}
          onScrollEnd={fetchNextPage}
        >
          {contents.map((subscribe) => (
            <VirtualItem key={subscribe.id} name={"subscribe-item"}>
              <SubscribeItem subscribe={subscribe} />
            </VirtualItem>
          ))}
        </VirtualScroll>
      )}
    </div>
  );
};

export default Page;
