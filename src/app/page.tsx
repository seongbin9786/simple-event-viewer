"use client";

import { useEffect, useState } from "react";

import { Project } from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb";
import { EventService } from "@buf/alignai_frontend-challenge-datetz.connectrpc_es/event/v1/event_connect";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { useFetch, useTokenPaginatedFetch } from "@/utils/hooks";

import { EventTable, EventViewerLayout, ProjectSelect } from "./modules";

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
    fetchFn: async (nextPageToken) => {
      const response = await client.listEvents({
        projectId: selectedProject?.id,
        pageToken: nextPageToken,
      });

      const { events, totalSize } = response;
      return {
        data: {
          events,
          totalSize,
        },
        totalLength: response.totalSize,
        pageToken: response.nextPageToken,
      };
    },
    deps: [],
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
      dateRangePicker={"(dateRangePicker)"}
      eventTable={
        <EventTable
          eventList={
            isEventsLoaded
              ? {
                  project: selectedProject,
                  events: listEventsResponse.events,
                  totalEvents: listEventsResponse.totalSize,
                  pageSize: EVENTS_PAGE_SIZE,
                  currentPage,
                  hasNextPage: currentPage < totalEventPages,
                  goToPrevPage: () =>
                    setCurrentPage(Math.max(currentPage - 1, 1)),
                  goToNextPage: () =>
                    setCurrentPage(Math.min(currentPage + 1, totalEventPages)),
                }
              : undefined
          }
        />
      }
    />
  );
}
