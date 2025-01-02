"use client";

import { useEffect, useState } from "react";

import { Project } from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb";
import { EventService } from "@buf/alignai_frontend-challenge-datetz.connectrpc_es/event/v1/event_connect";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { useFetch, useTokenPaginatedFetch } from "@/utils/hooks";

import {
  DateFilter,
  DateStringPair,
  EventTable,
  EventViewerLayout,
  ProjectSelect,
} from "./modules";

const transport = createConnectTransport({
  baseUrl:
    "https://frontend-challenge-datetz-backend-725853975024.asia-northeast3.run.app/",
});

const client = createClient(EventService, transport);

const EVENTS_PAGE_SIZE = 15;

export default function EventViewerPage() {
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined,
  );

  const [dateRangeFilter, setDateRangeFilter] = useState<
    DateStringPair | undefined
  >(undefined);

  console.log(dateRangeFilter);

  const {
    data: projects,
    isLoading: isProjectLoading,
    isEnabled: isProjectEnabled,
  } = useFetch({
    fetchFn: async () => {
      const result = await client.listProjects({});
      return result.projects;
    },
    deps: [],
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProject]);

  const {
    data: listEventsResponse,
    isLoading: isEventsLoading,
    isEnabled: isEventsEnabled,
    totalPages: totalEventPages,
  } = useTokenPaginatedFetch({
    enabled: !!selectedProject,
    pageSize: EVENTS_PAGE_SIZE,
    currentPage,
    fetchFn: async (pageToken) => {
      const { events, totalSize, nextPageToken } = await client.listEvents({
        projectId: selectedProject?.id,
        filter:
          dateRangeFilter &&
          `create_time >= "${dateRangeFilter.from}" AND create_time < "${dateRangeFilter.to}"`,
        pageToken: pageToken,
      });
      return {
        data: {
          events,
          totalSize,
        },
        totalLength: totalSize,
        pageToken: nextPageToken,
      };
    },
    deps: [dateRangeFilter],
    resetDeps: [selectedProject],
  });

  if (!isProjectEnabled || isProjectLoading) {
    return <div>Loading projects...</div>;
  }

  const isEventsLoaded = selectedProject && isEventsEnabled && !isEventsLoading;

  return (
    <EventViewerLayout
      projectSelect={
        <ProjectSelect
          projectList={projects}
          selectedProject={selectedProject}
          onSelect={setSelectedProject}
        />
      }
      dateRangePicker={
        <DateFilter
          timeZone={selectedProject?.timeZone?.id}
          setDateRangeFilter={setDateRangeFilter}
        />
      }
      eventTable={
        isEventsLoaded ? (
          <EventTable
            eventList={{
              project: selectedProject,
              events: listEventsResponse.events,
              paginationMetadata: {
                totalEvents: listEventsResponse.totalSize,
                pageSize: EVENTS_PAGE_SIZE,
                currentPage,
                hasNextPage: currentPage < totalEventPages,
                goToPrevPage: () =>
                  setCurrentPage(Math.max(currentPage - 1, 1)),
                goToNextPage: () =>
                  setCurrentPage(Math.min(currentPage + 1, totalEventPages)),
              },
            }}
          />
        ) : null
      }
    />
  );
}
