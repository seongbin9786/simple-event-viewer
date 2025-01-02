"use client";

import { useState } from "react";

import { EventService } from "@buf/alignai_frontend-challenge-datetz.connectrpc_es/event/v1/event_connect";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { useFetch } from "@/utils/hooks";

import { EventTable, EventViewerLayout } from "./modules";

const transport = createConnectTransport({
  baseUrl:
    "https://frontend-challenge-datetz-backend-725853975024.asia-northeast3.run.app/",
});

const client = createClient(EventService, transport);

export default function EventViewerPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | undefined
  >(undefined);
  const selectProjectById = (projectId: string) => {
    console.log("selected projectId:", projectId);
    setSelectedProjectId(projectId);
  };

  const { data: projects, isLoading: isProjectLoading } = useFetch({
    fetchFn: async () => {
      const result = await client.listProjects({});
      return result.projects;
    },
    deps: [],
  });

  if (isProjectLoading) {
    return <div>Loading...</div>;
  }

  console.log("projects:", projects);

  return (
    <EventViewerLayout
      projectSelect={"(Select)"}
      dateRangePicker={"(dateRangePicker)"}
      eventTable={<EventTable />}
    />
  );
}
