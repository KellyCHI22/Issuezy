import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { CommentCard, CommentSheet } from "@/features/comments";
import { type Issue, getIssue } from "@/features/issues/apis/issue-api";
import {
  type Comment,
  getComments,
} from "@/features/comments/apis/comment-api";
import { Badge, PriorityBadge } from "@/components/ui/badge";
import { formatTime } from "@/utils";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Contact2, Pencil, Trash2 } from "lucide-react";
import {
  EditIssueSheet,
  DeleteIssueAlert,
  AssignIssueSheet,
} from "@/features/issues";
import { Project, getProject } from "@/features/projects/apis/project-api";
import { ScrollArea } from "@/components/ui/scroll-area";
import Spinner from "@/components/ui/spinner";
import { Authorization } from "@/components/Authorization";

export function IssuePage() {
  const { id, iid } = useParams();
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [showAssignSheet, setShowAssignSheet] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["projects", id],
        queryFn: () => getProject(id),
      },

      {
        queryKey: ["projects", id, "issues", iid],
        queryFn: () => getIssue({ projectId: id, issueId: iid }),
      },
      {
        queryKey: ["projects", id, "issues", iid, "comments"],
        queryFn: () => getComments({ projectId: id, issueId: iid }),
      },
    ],
  });

  const isLoading = queryResults.some(
    (result) => result.isLoading || result.isFetching,
  );
  const isError = queryResults.some((result) => result.isError);

  if (isLoading) return <Spinner />;
  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  const project = queryResults[0].data.project as Project;
  const issue = queryResults[1].data.issue as Issue;
  const comments = queryResults[2].data.comments as Comment[];

  return (
    <div className="min-h-[calc(100vh-60px)] p-8 lg:grid lg:grid-cols-5 lg:gap-8 lg:p-0">
      <div className="rounded-lg lg:col-span-2 lg:my-8 lg:ml-8 lg:h-fit lg:border lg:bg-white lg:p-6 lg:dark:bg-gray-900">
        <div className="relative">
          <div className="space-y-2">
            <div className="relative space-x-2">
              <Badge className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600">
                {issue.Category.name}
              </Badge>
              <Badge variant="secondary">{issue.status}</Badge>
              <PriorityBadge priority={issue.priority} />
            </div>
            <h2 className="text-3xl font-bold leading-relaxed tracking-tight">
              {issue.title}
            </h2>
            <p className="mt-2 dark:text-secondary-foreground">
              {issue.description}
            </p>

            <div className="pt-5 text-sm">
              <p className="text-muted-foreground">
                Created at: {formatTime(issue.createdAt)}
              </p>
              <div className="flex gap-3">
                <p className="flex items-center gap-2 text-muted-foreground">
                  Reporter: <UserAvatar user={issue.Reporter} />
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  Assignee:{" "}
                  {issue.Assignee ? (
                    <UserAvatar user={issue.Assignee} />
                  ) : (
                    <span>Unassigned</span>
                  )}
                </p>
              </div>
              {/* // todo only certain people can edit or assign user */}
              <div className="flex space-x-2 pt-6">
                <Authorization
                  projectId={project.id.toString()}
                  issue={issue}
                  action="issue:edit"
                >
                  <Button
                    variant="default"
                    onClick={() => setShowEditSheet(true)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Authorization>
                <Authorization
                  projectId={project.id.toString()}
                  issue={issue}
                  action="issue:assign"
                >
                  <Button
                    variant="secondary"
                    className="border bg-white dark:bg-secondary"
                    onClick={() => setShowAssignSheet(true)}
                  >
                    <Contact2 className="mr-2 h-4 w-4" />
                    {issue.Assignee ? "Reassign" : "Assign"}
                  </Button>
                </Authorization>
                <Authorization
                  projectId={project.id.toString()}
                  issue={issue}
                  action="issue:delete"
                >
                  <Button
                    variant="outline-desctructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </Authorization>
                <EditIssueSheet
                  project={project}
                  issue={issue}
                  showEditSheet={showEditSheet}
                  setShowEditSheet={setShowEditSheet}
                />
                <AssignIssueSheet
                  project={project}
                  issue={issue}
                  showAssignSheet={showAssignSheet}
                  setShowAssignSheet={setShowAssignSheet}
                />
                <DeleteIssueAlert
                  projectId={project.id.toString()}
                  issueId={issue.id.toString()}
                  showDeleteDialog={showDeleteDialog}
                  setShowDeleteDialog={setShowDeleteDialog}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6 lg:col-span-3 lg:flex lg:h-screen lg:flex-col lg:py-8 lg:pr-8">
        <div className="mb-3 flex flex-grow-0 items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight">Comments</h3>
          <div className="space-x-2">
            <CommentSheet projectId={id} issueId={iid} />
          </div>
        </div>
        <ScrollArea>
          <div className="flex-1 space-y-5">
            {comments.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                There are no comments yet.
              </p>
            ) : (
              comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  projectId={id}
                  issueId={iid}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
