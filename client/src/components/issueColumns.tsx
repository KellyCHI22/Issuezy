import { formatTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Badge, PriorityBadge } from "./ui/badge";

import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import { Issue } from "@/apis/issue-api";
import IssueActionsDropdown from "./IssueActionsDropdown";

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "title",
    header: () => <div>Title</div>,
    cell: ({ row }) => {
      const title = row.getValue<string>("title");
      return (
        <Link
          to={`/projects/${row.original.projectId}/issues/${row.original.id}`}
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
          <Badge className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600">
            {name}
          </Badge>
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
          <Badge variant="secondary">{status}</Badge>
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
      const issue = row.original;
      return <IssueActionsDropdown issue={issue} />;
    },
  },
];
