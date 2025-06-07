"use client";

import PullToRefresh from "./pullToRefresh";

export default function PullToRefreshWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PullToRefresh
      onRefresh={async () => {
        window.location.reload();
        return Promise.resolve();
      }}
    >
      {children}
    </PullToRefresh>
  );
}
