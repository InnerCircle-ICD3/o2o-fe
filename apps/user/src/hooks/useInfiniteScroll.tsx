import { useState } from "react";

interface InfiniteScrollOptions {
  size: number;
  onSuccess: () => void;
  onError: (err: unknown) => void;
}

export const useInfiniteScroll = ({
  size,
  onSuccess,
  onError,
}: InfiniteScrollOptions) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  return { page, data, isFetching, hasNextPage };
};
