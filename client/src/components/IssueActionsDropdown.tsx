import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contact2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { AssignIssueSheet } from "./AssignIssueSheet";
import { Issue } from "@/apis/issue-api";
import { useQuery } from "@tanstack/react-query";
import { Project, getProject } from "@/apis/project-api";
import { EditIssueSheet } from "./EditIssueSheet";
import { DeleteIssueAlert } from "./DeleteIssueAlert";
import { useState } from "react";

export default function IssueActionsDropdown({ issue }: { issue: Issue }) {
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [showAssignSheet, setShowAssignSheet] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const projectQuery = useQuery({
    queryKey: ["projects", issue.projectId],
    queryFn: () => getProject(issue.projectId),
  });

  if (projectQuery.status === "loading") {
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
        <DropdownMenuItem onClick={() => setShowEditSheet(true)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit issue
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setShowAssignSheet(true)}>
          <Contact2 className="mr-2 h-4 w-4" />
          {issue.Assignee ? "Reassign user" : "Assign user"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setShowDeleteDialog(true)}
          className="text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete issue
        </DropdownMenuItem>
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
