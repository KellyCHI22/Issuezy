import { formatTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Issue = {
  id: number;
  title: string;
  description: string;
  status: "open" | "in progress" | "wait for review" | "close";
  priority: 1 | 2 | 3;
  categoryId: number;
  reporterId: number;
  assigneeId: number | undefined | null;
  createdAt: string;
  updatedAt: string;
  Reporter: { id: number; name: string };
  Assignee: { id: number; name: string };
  Category: { id: number; name: string };
};

export function PriorityBadge({ priority }: { priority: string }) {
  switch (priority) {
    case "1":
      return <Badge className="bg-red-500 text-black">high</Badge>;
    case "2":
      return <Badge className="bg-yellow-300 text-black">medium</Badge>;
    case "3":
      return <Badge className="bg-green-500 text-black">low</Badge>;
    default:
      return <Badge className="bg-green-500 text-black">low</Badge>;
  }
}

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue<string>("title");
      return (
        <Link
          to={`/projects/1/issues/${row.original.id}`}
          className="font-bold hover:text-violet-500"
        >
          {title}
        </Link>
      );
    },
  },
  {
    accessorKey: "Category.name",
    header: () => <div className="flex w-[12ch] justify-center">Category</div>,
    cell: ({ row }) => {
      const { name } = row.original.Category;
      return (
        <div className="text-center">
          <Badge variant="secondary">{name}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      return (
        <div className="text-center">
          <Badge variant="outline">{status}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: () => <div className="text-center">Priority</div>,
    cell: ({ row }) => {
      const priority = row.getValue<number>("priority").toString();
      return (
        <div className="text-center">
          <PriorityBadge priority={priority} />
        </div>
      );
    },
  },
  {
    accessorKey: "Reporter.name",
    header: () => <div className="text-center">Reporter</div>,
    cell: ({ row }) => {
      const { name } = row.original.Reporter;
      return <div className="text-center">{name}</div>;
    },
  },
  {
    accessorKey: "Assignee.name",
    header: () => <div className="text-center">Assignee</div>,
    cell: ({ row }) => {
      const { name } = row.original.Assignee;
      return <div className="text-center">{name}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Created At</div>,
    cell: ({ row }) => {
      const createdTime: string = row.getValue("createdAt");
      const formatted = formatTime(createdTime);
      return <div className="text-center">{formatted}</div>;
    },
  },
];
