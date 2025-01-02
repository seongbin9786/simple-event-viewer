import {
  Event,
  Project,
} from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb";

import { PaginationMetadata } from "./PaginationMetadata";

export interface PaginatedEventList {
  project: Project;
  events: Event[];
  paginationMetadata: PaginationMetadata;
}
