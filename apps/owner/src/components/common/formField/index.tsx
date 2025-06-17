import { MultiSelect } from "@/components/common/multipleSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { StoreCategory } from "@/types/store";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { ReactNode } from "react";
import { TagInput } from "../tagInput";

type BaseProps = {
  label: string;
  name: string;
  rightElement?: ReactNode;
  error?: string;
};

type InputFieldProps = {
  type: "input";
} & BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

type TextareaFieldProps = {
  type: "textarea";
} & BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name">;

type TagInputFieldProps = {
  type: "tagInput";
  value: string[];
  onChange: (value: string[]) => void;
} & BaseProps;

type MultiSelectFieldProps = {
  type: "multiSelect";
  value: string[];
  onChange: (value: string[]) => void;
  options: StoreCategory[];
} & BaseProps;

type ImageFieldProps = {
  type: "image";
  value: string;
  onChange: (value: string) => void;
} & BaseProps;

type FormFieldProps =
  | InputFieldProps
  | TextareaFieldProps
  | TagInputFieldProps
  | MultiSelectFieldProps
  | ImageFieldProps;

export function FormField(props: FormFieldProps) {
  const { label, name, rightElement, error } = props;

  if (props.type === "multiSelect") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <Label htmlFor={name} className="w-[90px]">
            {label}
          </Label>
          <div className="flex-1 flex gap-2">
            <MultiSelect
              options={props.options}
              value={props.value}
              onChange={props.onChange}
              placeholder="카테고리를 선택하세요"
            />
            {rightElement && <div className="flex items-center">{rightElement}</div>}
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-500 ml-[124px] break-words whitespace-pre-line max-w-[250px]">
            {error}
          </p>
        )}
      </div>
    );
  }
  if (props.type === "tagInput") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <Label htmlFor={name} className="w-[90px]">
            {label}
          </Label>
          <div className="flex-1 flex gap-2">
            <TagInput label={label} value={props.value} onChange={props.onChange} error={error} />
            {rightElement && <div className="flex items-center">{rightElement}</div>}
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-500 ml-[124px] break-words whitespace-pre-line max-w-[250px]">
            {error}
          </p>
        )}
      </div>
    );
  }
  if (props.type === "textarea") {
    // TextareaFieldProps만 추출
    const { type, label, name, rightElement, error, ...textareaProps } = props;
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <Label htmlFor={name} className="w-[90px]">
            {label}
          </Label>
          <div className="flex-1 flex gap-2">
            <Textarea
              id={name}
              aria-label={label}
              {...(textareaProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
            {rightElement && <div className="flex items-center">{rightElement}</div>}
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-500 ml-[124px] break-words whitespace-pre-line max-w-[250px]">
            {error}
          </p>
        )}
      </div>
    );
  }
  if (props.type === "image") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <Label htmlFor={name} className="w-[90px]">
            {label}
          </Label>
          <div className="flex-1 flex gap-2">
            <input
              id={name}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    props.onChange(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="cursor-pointer border rounded px-3 py-2 w-full"
            />
            {rightElement && <div className="flex items-center">{rightElement}</div>}
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-500 ml-[124px] break-words whitespace-pre-line max-w-[250px]">
            {error}
          </p>
        )}
      </div>
    );
  }

  const {
    type,
    label: _label,
    name: _name,
    rightElement: _rightElement,
    error: _error,
    ...inputProps
  } = props;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <Label htmlFor={name} className="w-[90px]">
          {label}
        </Label>
        <div className="flex-1 flex gap-2">
          <Input
            id={name}
            aria-label={label}
            {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
          />
          {rightElement && <div className="flex items-center">{rightElement}</div>}
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500 ml-[124px] break-words whitespace-pre-line max-w-[250px]">
          {error}
        </p>
      )}
    </div>
  );
}
