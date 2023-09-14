import { formatTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Issue = {
  id: number;
  title: string;
  description: string;
  status: "open" | "in progress" | "wait for review" | "close";
  priority: "1" | "2" | "3";
  categoryId: number;
  reporterId: number;
  assigneeId: number | undefined | null;
  createdAt: string;
  updatedAt: string;
  Reporter: { id: number; firstname: string; lastname: string };
  Assignee: { id: number; firstname: string; lastname: string };
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
    header: () => <div>Title</div>,
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
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
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
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
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
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Priority
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const priority = row.getValue<string>("priority");
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
      return (
        <div className="mx-auto w-fit">
          <UserAvatar user={row.original.Reporter} />
        </div>
      );
    },
  },
  {
    accessorKey: "Assignee.name",
    header: () => <div className="text-center">Assignee</div>,
    cell: ({ row }) => {
      const assignee = row.original.Assignee;
      if (!assignee) {
        return <div className="mx-auto w-fit">Unassigned</div>;
      }
      return (
        <div className="mx-auto w-fit">
          <UserAvatar user={assignee} />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    sortingFn: "datetime",
    cell: ({ row }) => {
      const createdTime: string = row.getValue("createdAt");
      const formatted = formatTime(createdTime);
      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
