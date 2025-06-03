import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  name: string;
  rightElement?: React.ReactNode;
  error?: string;
};

type InputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name"> & { isTextarea?: false };
type TextareaProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> & { isTextarea: true };

type FormFieldProps = InputProps | TextareaProps;

export function FormField({
  label,
  name,
  isTextarea = false,
  rightElement,
  error,
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <Label className="w-[90px]">{label}</Label>
        <div className="flex-1 flex gap-2">
          {isTextarea ? (
            <Textarea name={name} {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
          ) : (
            <Input name={name} {...(props as InputHTMLAttributes<HTMLInputElement>)} />
          )}
          {rightElement}
        </div>
      </div>
      {error && <p className="text-sm text-red-500 ml-[124px]">{error}</p>}
    </div>
  );
}
