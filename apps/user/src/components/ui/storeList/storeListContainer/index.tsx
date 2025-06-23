"use client";

import ErrorUi from "@/components/common/errorUi";
import VirtualScroll, { VirtualItem } from "@/components/common/virtualScroll";
import { StoreCard } from "@/components/ui/storeList/storeCard";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import { useStoreList } from "@/hooks/api/useStoreList";
import useSubscribeAll from "@/hooks/api/useSubscribeAll";
import { userInfoStore } from "@/stores/userInfoStore";
import type { StoreList } from "@/types/apis/stores.type";
import Categories from "../categories";
import * as style from "./storeListContainer.css";

const StoreListContainer = () => {
  const { user } = userInfoStore();
  const isLogin = !!user?.customerId;
  const { stores, isLoading, fetchNextPage, isError, isFetchingNextPage, hasNextPage, error } =
    useStoreList();
  const subscribes = useSubscribeAll(isLogin);

  const handleNextPage = () => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  };

  if (isError) {
    return <ErrorUi message={error?.message} />;
  }

  const list = stores?.pages.flatMap((page) => (page.success ? page.data.contents : [])) || [];

  return (
    <div className={style.container}>
      {list.length === 0 ? (
        <div className={style.errorWrapper}>
          <div className={style.error}>
            <Categories />
          </div>

          <ErrorUi
            type={"home"}
            message={`이 근처에는 아직 등록된 가게가 없어요.
우리, 좀 더 유명해져야 할 이유가 생겼네요.`}
            isButton={false}
          />
        </div>
      ) : (
        <VirtualScroll
          overscan={3}
          heights={{
            "store-title": {
              height: 48,
            },
            "store-item": {
              height: 228,
            },
            "store-category": {
              aspectRatio: 388 / 205,
            },
            "loading-bar": {
              height: 50,
            },
            skeleton: {
              height: 272,
            },
          }}
          onScrollEnd={handleNextPage}
        >
          <VirtualItem name={"store-category"}>
            <Categories />
          </VirtualItem>
          <VirtualItem name={"store-title"}>
            <h2 className={style.title}>지금 근처에서 할인 중인 가게를 찾아봤어요!</h2>
          </VirtualItem>

          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <VirtualItem key={`skeleton-${i}-${Date.now()}`} name={"skeleton"}>
                  <SkeletonStoreCard />
                </VirtualItem>
              ))
            : list.map((store: StoreList) => (
                <VirtualItem key={store.storeId} name={"store-item"}>
                  <StoreCard storesDetail={store} isFavorite={subscribes.includes(store.storeId)} />
                </VirtualItem>
              ))}

          {hasNextPage && (
            <VirtualItem name={"loading-bar"}>
              <div className={style.loadingContainer}>
                <svg
                  className={style.pullIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="로딩"
                  role="img"
                >
                  <path
                    d="M12 4.75V6.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.1266 6.87347L16.0659 7.93413"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.25 12L17.75 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.1266 17.1265L16.0659 16.0659"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 19.25V17.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.9342 17.1265L8.99486 16.0659"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.75 12L6.25 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.9342 6.87347L8.99486 7.93413"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </VirtualItem>
          )}
        </VirtualScroll>
      )}
    </div>
  );
};

export default StoreListContainer;
