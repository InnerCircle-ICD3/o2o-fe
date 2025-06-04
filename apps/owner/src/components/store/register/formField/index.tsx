import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { TagInput } from "../tagInput";

type BaseProps = {
  label: string;
  name: string;
  rightElement?: React.ReactNode;
  error?: string;
  isTextarea?: boolean;
  isMultiple?: boolean;
};

type InputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name"> & { isTextarea?: false };
type TextareaProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> & { isTextarea: true };
type TagInputProps = BaseProps & {
  value: string[];
  onChange: (value: string[]) => void;
  isMultiple: true;
};

type FormFieldProps = InputProps | TextareaProps | TagInputProps;

export function FormField({
  label,
  name,
  isTextarea = false,
  isMultiple = false,
  rightElement,
  error,
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <Label htmlFor={name} className="w-[90px]">
          {label}
        </Label>
        <div className="flex-1 flex gap-2">
          {isMultiple ? (
            <TagInput
              label={label}
              value={(props as TagInputProps).value}
              onChange={(props as TagInputProps).onChange}
              error={error}
            />
          ) : isTextarea ? (
            <Textarea
              id={name}
              name={name}
              aria-label={label}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <Input
              id={name}
              name={name}
              aria-label={label}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
          {rightElement}
        </div>
      </div>
      {error && <p className="text-sm text-red-500 ml-[124px]">{error}</p>}
    </div>
  );
}
