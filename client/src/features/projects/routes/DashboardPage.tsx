import { Project, getProject } from "@/features/projects/apis/project-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import { TableProperties } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { formatTime } from "@/utils";
import { MembersList } from "@/features/projects/components/MembersList";
import { ScrollArea } from "@/components/ui/scroll-area";
import Spinner from "@/components/ui/spinner";
import { EditProjectSheet } from "../components/EditProjectSheet";
import { DeleteProjectAlert } from "../components/DeleteProjectAlert";
import { Issue, getIssues } from "@/features/issues/apis/issue-api";
import { ChartBoard } from "../components/ChartBoard";
import { CategoriesList } from "@/features/categories";
import { Authorization } from "@/components/Authorization";

export function DashboardPage() {
  const { id } = useParams();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const projectQuery = useQuery({
    queryKey: ["projects", id],
    queryFn: () => id && getProject({ projectId: id }),
  });
  const issuesQuery = useQuery({
    queryKey: ["projects", id, "issues"],
    queryFn: () => id && getIssues({ projectId: id }),
  });

  const isLoading =
    projectQuery.isLoading ||
    projectQuery.isFetching ||
    issuesQuery.isLoading ||
    issuesQuery.isFetching;

  const isError = projectQuery.isError || issuesQuery.isError;

  if (isLoading) return <Spinner />;
  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  const project = projectQuery.data.project as Project;
  const issues = issuesQuery.data.issues as Issue[];

  return (
    <div className="lg:h-screen">
      <div className="h-full flex-1 flex-col space-y-4 p-8 md:flex">
        <div className="items-end lg:flex lg:justify-between lg:gap-5">
          <div className="space-y-2">
            <Badge className={project.isPublic ? "" : "bg-pink-500"}>
              {project.isPublic ? "public" : "private"}
            </Badge>
            <h2 className="text-3xl font-bold leading-relaxed tracking-tight">
              {project.name}
            </h2>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 pt-5 lg:items-end lg:pt-0">
            <div className="flex items-center gap-2 text-muted-foreground">
              <p className="flex items-center gap-2">
                <span>Creator:</span> <UserAvatar user={project.Creator} />
              </p>
              <p>Created at: {formatTime(project.createdAt)}</p>
            </div>
            <div className="flex gap-3">
              <Link to={`/projects/${id}`}>
                <Button variant="default" className="">
                  <TableProperties className="mr-2 h-4 w-4" />
                  {isMobile ? "Issues" : "View issues"}
                </Button>
              </Link>
              <Authorization
                projectId={project.id.toString()}
                action="project:edit"
              >
                <EditProjectSheet project={project} />
              </Authorization>
              <Authorization
                projectId={project.id.toString()}
                action="project:delete"
              >
                <DeleteProjectAlert projectId={project.id.toString()} />
              </Authorization>
            </div>
          </div>
        </div>
        <ScrollArea>
          <div className="grid gap-3 rounded-lg lg:grid-cols-5">
            {/* charts */}
            <div className="h-fit rounded-lg bg-white p-6 text-center dark:bg-gray-900 lg:col-span-3">
              <ChartBoard issues={issues} project={project} />
            </div>
            {/* members */}
            <div className="h-fit space-y-3 lg:col-span-2">
              <MembersList projectId={project.id.toString()} />
              <CategoriesList project={project} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
