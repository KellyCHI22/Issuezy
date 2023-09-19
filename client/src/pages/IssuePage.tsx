import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import CommentCard from "@/components/CommentCard";
import { CommentSheet } from "@/components/CommentSheet";
import { type Issue, getIssue } from "@/apis/issue-api";
import { type Comment, getComments } from "@/apis/comment-api";
import { Badge, PriorityBadge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Contact2 } from "lucide-react";
import { EditIssueSheet } from "@/components/EditIssueSheet";
import { Project, getProject } from "@/apis/project-api";
import { DeleteIssueAlert } from "@/components/DeleteIssueAlert";
import { AssignIssueSheet } from "@/components/AssignIssueSheet";

export default function IssuePage() {
  const { id, iid } = useParams();

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

  // todo need to add loading skeleton component
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  const project = queryResults[0].data.project as Project;
  const issue = queryResults[1].data.issue as Issue;
  const comments = queryResults[2].data.comments as Comment[];

  return (
    <div className="min-h-screen p-8 lg:grid lg:grid-cols-5 lg:gap-8 lg:p-0">
      <div className=" rounded-lg lg:col-span-2 lg:my-8 lg:ml-8 lg:h-fit lg:border lg:bg-white lg:p-6 lg:dark:bg-gray-900">
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

            <div className="pt-5">
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
                <EditIssueSheet project={project} issue={issue} />
                <AssignIssueSheet project={project} issue={issue} />
                <DeleteIssueAlert
                  projectId={project.id.toString()}
                  issueId={issue.id.toString()}
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
        <div className="flex-1 space-y-5 overflow-y-scroll">
          {comments.length === 0 ? (
            <p className="text-muted-foreground">There are no comments yet</p>
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
      </div>
    </div>
  );
}
