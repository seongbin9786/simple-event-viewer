"use client";

import { useState } from "react";

import { Project } from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb";
import { EventService } from "@buf/alignai_frontend-challenge-datetz.connectrpc_es/event/v1/event_connect";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { useFetch, useTokenPaginatedFetch } from "@/utils/hooks";

import { EventTable, EventViewerLayout, ProjectSelect } from "./modules";
import { PaginatedEventList } from "./modules/PaginatedEventList";

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

  console.log("currentPage:", currentPage);

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

      console.log("from server:", response);
      console.log("from server - next token:", response.nextPageToken);

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
    deps: [selectedProject],
  });

  if (!isProjectEnabled || isProjectLoading) {
    return <div>Loading projects...</div>;
  }

  console.log("projects:", projects);

  if (!selectedProject || !isEventsEnabled || isEventsLoading) {
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
        eventTable={"Please choose a project to see events."}
      />
    );
  }

  const paginatedEventList: PaginatedEventList = {
    project: selectedProject,
    events: listEventsResponse.events,
    totalEvents: listEventsResponse.totalSize,
    pageSize: EVENTS_PAGE_SIZE,
    currentPage,
    hasNextPage: currentPage < totalEventPages,
    goToPrevPage: () => setCurrentPage(Math.max(currentPage - 1, 1)),
    goToNextPage: () =>
      setCurrentPage(Math.min(currentPage + 1, totalEventPages)),
  };

  console.log("paginatedEventList:", paginatedEventList);
  console.log("totalEventPages:", totalEventPages);
  console.log("hasNextPage:", currentPage === totalEventPages);

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
      eventTable={<EventTable eventList={paginatedEventList} />}
    />
  );
}
