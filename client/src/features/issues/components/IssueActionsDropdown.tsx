import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contact2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { AssignIssueSheet } from "./AssignIssueSheet";
import { Issue } from "@/features/issues/apis/issue-api";
import { useQuery } from "@tanstack/react-query";
import { Project, getProject } from "@/features/projects/apis/project-api";
import { EditIssueSheet } from "./EditIssueSheet";
import { DeleteIssueAlert } from "./DeleteIssueAlert";
import { useState } from "react";
import { Authorization } from "@/components/Authorization";

export default function IssueActionsDropdown({ issue }: { issue: Issue }) {
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [showAssignSheet, setShowAssignSheet] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const projectQuery = useQuery({
    queryKey: ["projects", issue.projectId.toString()],
    queryFn: () => getProject(issue.projectId),
  });

  if (projectQuery.isLoading || projectQuery.isFetching) {
    return (
      <DropdownMenu>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenu>
    );
  }

  const project = projectQuery.data.project as Project;

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
        <Authorization
          projectId={project.id.toString()}
          issue={issue}
          action="issue:edit"
        >
          <DropdownMenuItem onClick={() => setShowEditSheet(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit issue
          </DropdownMenuItem>
        </Authorization>
        <Authorization
          projectId={project.id.toString()}
          issue={issue}
          action="issue:assign"
        >
          <DropdownMenuItem onClick={() => setShowAssignSheet(true)}>
            <Contact2 className="mr-2 h-4 w-4" />
            {issue.Assignee ? "Reassign user" : "Assign user"}
          </DropdownMenuItem>
        </Authorization>
        <Authorization
          projectId={project.id.toString()}
          issue={issue}
          action="issue:delete"
        >
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete issue
          </DropdownMenuItem>
        </Authorization>
      </DropdownMenuContent>
      <AssignIssueSheet
        project={project}
        issue={issue}
        showAssignSheet={showAssignSheet}
        setShowAssignSheet={setShowAssignSheet}
      />
      <EditIssueSheet
        project={project}
        issue={issue}
        showEditSheet={showEditSheet}
        setShowEditSheet={setShowEditSheet}
      />
      <DeleteIssueAlert
        projectId={project.id.toString()}
        issueId={issue.id.toString()}
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
      />
    </DropdownMenu>
  );
}
