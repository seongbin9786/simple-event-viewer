import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PaginatedEventList } from "./PaginatedEventList";
import { Pagination } from "./Pagination";

const formatDate = (
  timestamp: bigint | undefined,
  timeZone: string | undefined,
) => {
  if (!timestamp || !timeZone) {
    return "-";
  }
  return new Date(Number(timestamp) * 1000).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  });
};

interface EventTableProps {
  eventList: PaginatedEventList;
}

export const EventTable = ({
  eventList: { project, events, paginationMetadata },
}: EventTableProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div>{paginationMetadata.totalEvents} events</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] text-center">ID</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">CreateTime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="text-center">{event.id}</TableCell>
              <TableCell className="text-center">{event.type}</TableCell>
              <TableCell className="text-center">
                {formatDate(event.createTime?.seconds, project?.timeZone?.id)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination paginationMetadata={paginationMetadata} />
    </div>
  );
};
