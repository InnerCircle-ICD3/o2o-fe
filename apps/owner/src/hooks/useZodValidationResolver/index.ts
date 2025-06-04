import { useCallback } from "react";
import { z } from "zod";

export const useZodValidationResolver = <T extends z.ZodType>(schema: T) =>
  useCallback(
    async (data: unknown) => {
      try {
        console.log("data", data);
        const values = await schema.parseAsync(data);
        return { values, errors: {} };
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors = error.errors.reduce(
            (acc, err) => {
              const fieldName = err.path[0];
              const errorMessage = `${err.message} (${fieldName})`;
              acc[fieldName] = errorMessage;
              return acc;
            },
            {} as Record<string, string>,
          );

          console.error("검증 에러:", formattedErrors);
          return {
            values: data as z.infer<T>,
            errors: formattedErrors,
          };
        }
        return {
          values: data as z.infer<T>,
          errors: { form: "알 수 없는 오류가 발생했습니다" },
        };
      }
    },
    [schema],
  );
