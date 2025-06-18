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
  onChange: (value: string | File | null) => void;
  fileName?: string;
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
        <div className="flex items-start gap-4">
          <Label htmlFor={name} className="w-[90px] pt-2">
            {label}
          </Label>
          <div className="flex-1 flex gap-2 min-w-0">
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
          <Label
            htmlFor={name}
            className="w-[90px] whitespace-pre-line"
            style={{ wordBreak: "keep-all" }}
          >
            {label}
          </Label>
          <div className="flex-1 flex gap-2">
            <div className="relative w-full">
              <input
                id={name}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    props.onChange(file);
                  }
                }}
                className="hidden"
              />
              <Input
                type="text"
                readOnly
                value={props.fileName || ""}
                placeholder="파일을 선택하세요"
                className="w-full pr-8 cursor-pointer placeholder:text-gray-300"
                onClick={() => {
                  const fileInput = document.getElementById(name) as HTMLInputElement;
                  fileInput?.click();
                }}
              />
              {props.fileName && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.onChange(null);
                    const fileInput = document.getElementById(name) as HTMLInputElement;
                    if (fileInput) {
                      fileInput.value = "";
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          {rightElement && <div className="flex items-center">{rightElement}</div>}
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
    <div>
      <div className="flex items-center gap-4">
        <Label
          htmlFor={name}
          className="w-[90px] whitespace-pre-line"
          style={{ wordBreak: "keep-all" }}
        >
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
      <p className="text-xs text-red-500 ml-[110px] pt-0.5 break-words whitespace-pre-line max-w-[250px] h-[2px]">
        {error && error}
      </p>
    </div>
  );
}
