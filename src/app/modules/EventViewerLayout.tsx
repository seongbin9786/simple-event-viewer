"use client";

import { ReactNode } from "react";

interface EventViewerLayoutProps {
  projectSelect: ReactNode;
  dateRangePicker: ReactNode;
  eventTable: ReactNode;
}

export const EventViewerLayout = ({
  projectSelect,
  dateRangePicker,
  eventTable,
}: EventViewerLayoutProps) => {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col p-4">
      <div className="mb-8 flex flex-col gap-4 xl:flex-row">
        <div>{projectSelect}</div>
        <div>{dateRangePicker}</div>
      </div>
      <div>{eventTable}</div>
    </div>
  );
};
