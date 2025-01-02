import { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DateFilterOption = {
  label: string;
  value: string;
};

interface DateFilterButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "onSelect"> {
  range: DateFilterOption;
  onSelect: (value: string) => void;
  selected?: boolean;
}

export const DateFilterButton = ({
  range,
  onSelect,
  selected,
  onClick,
  ...props
}: DateFilterButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(selected && "bg-black text-white")}
      onClick={(e) => {
        onSelect(range.value);
        onClick?.(e);
      }}
      {...props}
    >
      {range.label}
    </Button>
  );
};
