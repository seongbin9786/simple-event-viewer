import {
  Event,
  Project,
} from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb";

export interface PaginatedEventList {
  project: Project;
  events: Event[];
  pageSize: number;
  currentPage: number;
  hasNextPage: boolean;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}
