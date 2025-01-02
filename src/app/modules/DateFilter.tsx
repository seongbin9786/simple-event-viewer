"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DateFilterButton } from "./DateFilterButton";
import { DateRange, DateStringPair } from "./DateRange";
import { applyTimeZone } from "./applyTimezone";
import { createRangeByDays, createRangeByMonths } from "./createDateRange";

const DATE_RANGE_OPTIONS = [
  {
    label: "Today",
    value: "today",
    generate: (timeZone?: string) => createRangeByDays(0, timeZone),
  },
  {
    label: "Yesterday",
    value: "yesterday",
    generate: (timeZone?: string) => createRangeByDays(1, timeZone),
  },
  {
    label: "7D",
    value: "7d",
    generate: (timeZone?: string) => createRangeByDays(7, timeZone),
  },
  {
    label: "30D",
    value: "30d",
    generate: (timeZone?: string) => createRangeByDays(30, timeZone),
  },
  {
    label: "3M",
    value: "3m",
    generate: (timeZone?: string) => createRangeByMonths(3, timeZone),
  },
  {
    label: "6M",
    value: "6m",
    generate: (timeZone?: string) => createRangeByMonths(6, timeZone),
  },
  {
    label: "12M",
    value: "12m",
    generate: (timeZone?: string) => createRangeByMonths(12, timeZone),
  },
];

interface DateFilterProps {
  timeZone?: string;
  setDateRangeFilter: (dateRange?: DateStringPair) => void;
}

export const DateFilter = ({
  timeZone,
  setDateRangeFilter,
}: DateFilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState("today");
  const [isCustomPickerOpen, setIsCustomPickerOpen] = useState(false);
  const [datePicker, setDateRangePicker] = useState<DateRange | undefined>(
    undefined,
  );

  const onSelectFilter = (nextFilter: string) => {
    setSelectedFilter(nextFilter);
  };

  const onSelectCustomDateRange = (nextCustomDateRange?: DateRange) => {
    setDateRangePicker(nextCustomDateRange);

    const isBothSelected =
      nextCustomDateRange && nextCustomDateRange.from && nextCustomDateRange.to;
    setIsCustomPickerOpen(!isBothSelected);
    if (isBothSelected) {
      setDateRangeFilter({
        from: applyTimeZone(nextCustomDateRange.from!, timeZone),
        to: applyTimeZone(nextCustomDateRange.to!, timeZone),
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="rounded-md border bg-background px-1 text-gray-700">
        {DATE_RANGE_OPTIONS.map((range) => (
          <DateFilterButton
            key={range.value}
            range={range}
            onSelect={(filter) => {
              onSelectFilter(filter);
              setDateRangeFilter(range.generate(timeZone));
            }}
            selected={selectedFilter === range.value}
          />
        ))}
        <Popover open={isCustomPickerOpen} onOpenChange={setIsCustomPickerOpen}>
          <PopoverTrigger asChild>
            <DateFilterButton
              range={{
                label: "Custom",
                value: "custom",
              }}
              onSelect={onSelectFilter}
              selected={selectedFilter === "custom"}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              selected={datePicker}
              onSelect={onSelectCustomDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
