import { IssueSheet } from "@/features/issues/components/IssueSheet";
import IssuesTable from "@/features/issues/components/IssuesTable";
import { columns } from "@/features/issues/components/issueColumns";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { type Project, getProject } from "@/features/projects/apis/project-api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { type Issue, getIssues } from "@/features/issues/apis/issue-api";
import { useMediaQuery } from "react-responsive";
import { GaugeCircle } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Spinner from "@/components/ui/spinner";

export function ProjectPage() {
  const { id } = useParams();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const projectQuery = useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id),
  });
  const issuesQuery = useQuery({
    queryKey: ["projects", id, "issues"],
    queryFn: () => getIssues(id),
  });

  if (projectQuery.status === "loading" || issuesQuery.status === "loading")
    return <Spinner />;
  if (projectQuery.status === "error" || issuesQuery.status === "error") {
    return (
      <h1>
        {JSON.stringify(projectQuery.error)}
        {JSON.stringify(issuesQuery.error)}
      </h1>
    );
  }

  const project = projectQuery.data.project as Project;
  const issues = issuesQuery.data.issues as Issue[];

  return (
    <div className="h-screen">
      <div className="h-full flex-1 flex-col space-y-4 p-8 md:flex">
        <div className="items-end justify-between  lg:flex">
          <div className="space-y-2">
            <Badge className={project.isPublic ? "" : "bg-pink-500"}>
              {project.isPublic ? "public" : "private"}
            </Badge>
            <h2 className="text-3xl font-bold leading-relaxed tracking-tight">
              {project.name}
            </h2>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <div className="flex gap-3">
            {/* // todo only project owner can view dashboard */}
            <Link to={`/projects/${id}/dashboard`}>
              <Button variant="default" className="">
                <GaugeCircle className="mr-2 h-4 w-4" />
                View dashboard
              </Button>
            </Link>
            <IssueSheet project={project} />
          </div>
        </div>

        {isMobile ? (
          "working in progress"
        ) : (
          <ScrollArea>
            <ScrollBar orientation="horizontal" />
            <div className="rounded-lg bg-white p-3 dark:bg-gray-900">
              <IssuesTable data={issues} columns={columns} project={project} />
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
