"use client";

import { handlers } from "@/mocks/handlers";
import { type PropsWithChildren, Suspense, use } from "react";

const mockingEnabledPromise =
  typeof window !== "undefined"
    ? import("@/mocks/browser").then(async ({ worker }) => {
        console.log(
          process.env.NEXT_RUNTIME,
          process.env.NODE_ENV,
          process.env.VERCEL_MSW_ENV,
          process.env.VERCEL_ENV,
        );

        console.log(process.env);

        console.log(process.env.NEXT_PUBLIC_API_URL);
        if (
          process.env.NODE_ENV === "development" ||
          process.env.VERCEL_MSW_ENV === "development" ||
          process.env.VERCEL_ENV === "preview"
        ) {
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
