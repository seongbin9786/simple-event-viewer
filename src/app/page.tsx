"use client";

import { useState } from "react";

import { Project } from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb";
import { EventService } from "@buf/alignai_frontend-challenge-datetz.connectrpc_es/event/v1/event_connect";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { useFetch } from "@/utils/hooks";

import { EventTable, EventViewerLayout, ProjectSelect } from "./modules";

const transport = createConnectTransport({
  baseUrl:
    "https://frontend-challenge-datetz-backend-725853975024.asia-northeast3.run.app/",
});

const client = createClient(EventService, transport);

export default function EventViewerPage() {
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined,
  );

  const { data: projects, isLoading: isProjectLoading } = useFetch({
    fetchFn: async () => {
      const result = await client.listProjects({});
      return result.projects;
    },
    deps: [],
  });

  const { data: listEventsResponse } = useFetch({
    enabled: !!selectedProject,
    fetchFn: () =>
      client.listEvents({
        projectId: selectedProject?.id,
      }),
    deps: [selectedProject],
  });

  if (isProjectLoading) {
    return <div>Loading...</div>;
  }

  console.log("projects:", projects);
  console.log("projects:", listEventsResponse);

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
          events={listEventsResponse}
          selectedProject={selectedProject}
        />
      }
    />
  );
}
