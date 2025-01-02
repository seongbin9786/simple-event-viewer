import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PaginatedEventList } from "./PaginatedEventList";

interface EventTableProps {
  eventList: PaginatedEventList;
}

export const EventTable = ({
  eventList: {
    project,
    events,
    totalEvents,
    pageSize,
    currentPage,
    hasNextPage,
    goToPrevPage,
    goToNextPage,
  },
}: EventTableProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div>{totalEvents} events</div>
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
                {new Date(
                  Number(event.createTime?.seconds) * 1000,
                ).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: project?.timeZone?.id,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center gap-4">
        <div>{`${Math.max(0, pageSize * (currentPage - 1)) + 1} - ${Math.min(pageSize * currentPage, totalEvents)} of ${totalEvents}`}</div>
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="select-none rounded-lg text-gray-900 disabled:text-gray-300"
        >
          {`<`}
        </button>
        <button
          onClick={goToNextPage}
          disabled={!hasNextPage}
          className="select-none rounded-lg text-gray-900 disabled:text-gray-300"
        >
          {`>`}
        </button>
      </div>
    </div>
  );
};
