import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ChangeEvent } from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "time";
  error?: string;
  register?: (name: string) => {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  };
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
}

export function FormField({
  label,
  name,
  type = "text",
  error,
  register,
  value,
  onChange,
  isTextarea = false,
}: FormFieldProps) {
  const InputComponent = isTextarea ? Textarea : Input;

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      {register ? (
        <InputComponent type={type} {...register(name)} />
      ) : (
        <InputComponent type={type} name={name} value={value} onChange={onChange} />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
