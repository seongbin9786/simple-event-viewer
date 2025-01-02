import {
  ListEventsResponse,
  Project,
} from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb";

interface EventTableProps {
  selectedProject?: Project;
  events?: ListEventsResponse;
}

export const EventTable = ({ selectedProject, events }: EventTableProps) => {
  if (!selectedProject) {
    return <div>Please select a project</div>;
  }

  if (!events) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>(numberOfEvents)</div>
      <div>(Table)</div>
      <div>(Pagination)</div>
    </div>
  );
};
