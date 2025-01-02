import { PaginatedEventList } from "./PaginatedEventList";

interface EventTableProps {
  eventList: PaginatedEventList;
}

export const EventTable = ({
  eventList: {
    project,
    events,
    pageSize,
    currentPage,
    hasNextPage,
    goToPrevPage,
    goToNextPage,
  },
}: EventTableProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div>이벤트 {events.length}개</div>
      <div>(Table)</div>
      <div>(Pagination)</div>
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        className="rounded-lg bg-blue-500 p-4 text-white disabled:bg-blue-50 disabled:text-gray-500"
      >
        go to prev page
      </button>
      <button
        onClick={goToNextPage}
        disabled={!hasNextPage}
        className="rounded-lg bg-blue-500 p-4 text-white disabled:bg-blue-50 disabled:text-gray-500"
      >
        go to next page
      </button>
    </div>
  );
};
