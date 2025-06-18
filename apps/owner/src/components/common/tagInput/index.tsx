"use client";

import { type KeyboardEvent, useRef, useState } from "react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  name?: string;
  label?: string;
  placeholder?: string;
  error?: string;
}

export function TagInput({ value, onChange, name, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    if ((e.key === "Enter" || e.key === ",") && inputValue.trim() !== "") {
      e.preventDefault();

      const rawTags = inputValue.split(",");
      const cleanedTags = rawTags
        .map((tag) => tag.replace(/\s+/g, "")) // 공백 제거
        .filter((tag) => tag !== "")
        .filter((tag) => !value.includes(tag));

      if (cleanedTags.length > 0) {
        onChange([...value, ...cleanedTags]);
      }

      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...value];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  const visibleTags = value.slice(0, 5);
  const hiddenTags = value.slice(5);
  const hiddenCount = hiddenTags.length;

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 border rounded-md px-2 py-1 min-h-[60px] focus-within:ring-2 focus-within:ring-ring">
        {visibleTags.map((tag, index) => (
          <span
            key={tag}
            className="bg-[#35A865] text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              className="hover:text-destructive text-xs text-white"
              onClick={() => removeTag(index)}
            >
              ×
            </button>
          </span>
        ))}

        {hiddenCount > 0 && (
          <div className="relative group">
            <span className="text-sm text-gray-500 cursor-pointer hover:underline">
              +{hiddenCount}
            </span>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-10 hidden group-hover:block">
              <div className="bg-white border rounded-md shadow-md px-3 py-2 text-sm whitespace-nowrap">
                <div className="flex flex-wrap gap-2 max-w-[240px]">
                  {hiddenTags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute top-1/2 -left-2 w-3 h-3 bg-white border-l border-t rotate-45 -translate-y-1/2" />
              </div>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          name={name}
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          className="flex-1 border-none focus:outline-none text-sm min-w-[100px] bg-transparent"
        />
      </div>
    </div>
  );
}
