"use client";

export default function EventViewerPage() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col p-4">
      <div className="mb-8 flex flex-col gap-4 xl:flex-row">
        <div>(Select)</div>
        <div>(SegmentedButtons)</div>
      </div>
      <div className="mb-4">(numberOfEvents)</div>
      <div className="mb-4">(Table)</div>
      <div>(Pagination)</div>
    </div>
  );
}
