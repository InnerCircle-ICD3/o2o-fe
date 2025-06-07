declare module "use-form-light" {
  export interface UseFormReturn<T> {
    errors: Record<string, string>;
    validate: () => boolean;
    setValue: <K extends keyof T>(name: K, value: T[K]) => void;
    watch: <K extends keyof T>(name: K) => T[K];
    handleSubmit: (callback: (data: T) => void) => (e: React.FormEvent) => void;
    register: (name: keyof T) => {
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
      onBlur: () => void;
    };
  }

  export function useForm<T>(options: {
    defaultValues: T;
  }): UseFormReturn<T>;
}
