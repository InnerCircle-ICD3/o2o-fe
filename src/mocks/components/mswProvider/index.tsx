"use client";
import { handlers } from "@/mocks/handlers";
import { PropsWithChildren, Suspense, use } from "react";

const mockingEnabledPromise =
  typeof window !== "undefined"
    ? import("@/mocks/browser").then(async ({ worker }) => {
        if (process.env.NODE_ENV === "development") {
          await worker.start();
          worker.use(...handlers);
          module.hot?.dispose(() => {
            worker.stop();
          });
        }
      })
    : Promise.resolve();

const MSWProvider = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <Suspense fallback={null}>
      <MSWWrapper>{children}</MSWWrapper>
    </Suspense>
  );
};

const MSWWrapper = (props: PropsWithChildren) => {
  const { children } = props;
  use(mockingEnabledPromise);

  return children;
};

export default MSWProvider;
