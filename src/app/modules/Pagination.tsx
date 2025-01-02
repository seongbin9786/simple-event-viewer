import { PaginationMetadata } from "./PaginationMetadata";

interface PaginationProps {
  paginationMetadata: PaginationMetadata;
}

export const Pagination = ({
  paginationMetadata: {
    currentPage,
    pageSize,
    totalEvents,
    hasNextPage,
    goToPrevPage,
    goToNextPage,
  },
}: PaginationProps) => {
  const pageRangeFrom = Math.max(0, pageSize * (currentPage - 1)) + 1;
  const pageRangeTo = Math.min(pageSize * currentPage, totalEvents);
  const paginationText = `${pageRangeFrom} - ${pageRangeTo} of ${totalEvents}`;

  return (
    <div className="flex justify-center gap-4">
      <div>{paginationText}</div>
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        className="select-none rounded-lg text-gray-900 disabled:text-gray-300"
      >
        {`<`}
      </button>
      <button
        onClick={goToNextPage}
        disabled={!hasNextPage}
        className="select-none rounded-lg text-gray-900 disabled:text-gray-300"
      >
        {`>`}
      </button>
    </div>
  );
};
