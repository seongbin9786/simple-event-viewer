"use client";

import { EventTable, EventViewerLayout } from "./modules";

export default function EventViewerPage() {
  return (
    <EventViewerLayout
      projectSelect={"(Select)"}
      dateRangePicker={"(dateRangePicker)"}
      eventTable={<EventTable />}
    />
  );
}
