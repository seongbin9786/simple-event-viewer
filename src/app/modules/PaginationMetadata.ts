export interface PaginationMetadata {
  totalEvents: number;
  pageSize: number;
  currentPage: number;
  hasNextPage: boolean;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}
