import { MultiSelect } from "@/components/store/register/multipleSelect"; // 위치 맞게 수정
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { StoreCategory } from "@/types/store";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { TagInput } from "../tagInput";

type BaseProps = {
  label: string;
  name: string;
  rightElement?: React.ReactNode;
  error?: string;
  isTextarea?: boolean;
  isMultiple?: boolean;
  isMultiSelect?: boolean;
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

type MultiSelectProps = BaseProps & {
  value: string[];
  onChange: (value: string[]) => void;
  options: StoreCategory[];
  isMultiSelect: true;
};

type FormFieldProps = InputProps | TextareaProps | TagInputProps | MultiSelectProps;

export function FormField({
  label,
  name,
  isTextarea = false,
  isMultiple = false,
  isMultiSelect = false,
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
          {isMultiSelect ? (
            <MultiSelect
              options={(props as MultiSelectProps).options}
              value={(props as MultiSelectProps).value}
              onChange={(props as MultiSelectProps).onChange}
              placeholder="카테고리를 선택하세요"
            />
          ) : isMultiple ? (
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
