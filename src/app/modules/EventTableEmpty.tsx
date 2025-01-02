import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const EventTableEmpty = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>0 events</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[200px] text-center">ID</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">CreateTime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            <TableCell className="py-16 text-center">
              프로젝트를 선택해주세요.
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-center gap-4">
        <div>0 - 0 of 0</div>
        <button
          disabled={true}
          className="select-none rounded-lg text-gray-900 disabled:text-gray-300"
        >
          {`<`}
        </button>
        <button
          disabled={true}
          className="select-none rounded-lg text-gray-900 disabled:text-gray-300"
        >
          {`>`}
        </button>
      </div>
    </div>
  );
};
