"use client";

import { handlers } from "@/mocks/handlers";
import { type PropsWithChildren, Suspense, use } from "react";

const mockingEnabledPromise =
  typeof window !== "undefined"
    ? import("@/mocks/browser").then(async ({ worker }) => {
        if (process.env.NEXT_PUBLIC_VERCEL_MSW_ENV === "development") {
          await worker.start();
          worker.use(...handlers);
          module.hot?.dispose(() => {
            worker.stop();
          });
        }
      })
    : Promise.resolve();

const MswProvider = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <Suspense fallback={null}>
      <MswWrapper>{children}</MswWrapper>
    </Suspense>
  );
};

const MswWrapper = (props: PropsWithChildren) => {
  const { children } = props;
  use(mockingEnabledPromise);

  return children;
};

export default MswProvider;
