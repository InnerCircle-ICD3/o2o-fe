"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { StoreCategory } from "@/types/store";
import { Check, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

interface MultiSelectProps {
  options: StoreCategory[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  visibleLimit?: number;
}

export function MultiSelect({
  options = [],
  value = [],
  onChange,
  visibleLimit = 4,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const allValues = options.map((o) => o.value);
  const isAllSelected = allValues?.length > 0 && value?.length === allValues?.length;

  const toggleOption = (optionValue: string) => {
    if (optionValue === "__ALL__") {
      onChange(isAllSelected ? [] : allValues);
      return;
    }

    const isSelected = value.includes(optionValue);
    const nextValue = isSelected ? value.filter((v) => v !== optionValue) : [...value, optionValue];

    // 자동으로 "전체" 선택 상태 유지
    onChange(nextValue.length === allValues.length ? allValues : nextValue);
  };

  const selectedOptions = useMemo(
    () => options?.filter((opt) => value?.includes(opt.value)),
    [options, value],
  );

  const visibleTags = isAllSelected
    ? [{ value: "__ALL__", label: "전체" }]
    : selectedOptions.slice(0, visibleLimit);

  const hiddenCount = isAllSelected ? 0 : selectedOptions.length - visibleTags.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className="w-full flex-wrap justify-between gap-2 min-h-[42px]"
        >
          <div className="flex flex-wrap gap-1 items-center">
            {visibleTags.map((tag) => (
              <span
                key={tag.value}
                className="bg-[#35A865] text-white text-xs px-2 py-0.5 rounded-md"
              >
                {tag.label}
              </span>
            ))}
            {hiddenCount > 0 && (
              <div className="relative group">
                <span className="text-xs text-muted-foreground cursor-pointer hover:underline">
                  +{hiddenCount}
                </span>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-10 hidden group-hover:block">
                  <div className="bg-white border rounded-md shadow-md px-3 py-2 text-sm whitespace-nowrap">
                    <div className="flex flex-wrap gap-2 max-w-[240px]">
                      {selectedOptions.slice(visibleLimit).map((option) => (
                        <span key={option.value} className="px-2 py-0.5">
                          {option.label}
                        </span>
                      ))}
                    </div>
                    <div className="absolute top-1/2 -left-2 w-3 h-3 bg-white border-l border-t rotate-45 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-h-72 overflow-auto">
        <Command>
          <CommandGroup>
            <CommandItem
              key="__ALL__"
              onSelect={() => toggleOption("__ALL__")}
              className="cursor-pointer"
            >
              <div
                className={cn(
                  "mr-2 h-4 w-4 rounded-sm border border-primary flex items-center justify-center",
                  isAllSelected ? "bg-primary text-white" : "opacity-50",
                )}
              >
                {isAllSelected && <Check className="h-3 w-3" />}
              </div>
              전체 선택
            </CommandItem>

            {options.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <CommandItem
                  key={option.value}
                  onSelect={() => toggleOption(option.value)}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "mr-2 h-4 w-4 rounded-sm border border-primary flex items-center justify-center",
                      isSelected ? "bg-primary text-white" : "opacity-50",
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                  {option.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
