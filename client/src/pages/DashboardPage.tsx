import { Project, getProject } from "@/apis/project-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import { Pencil, TableProperties, Trash2 } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { formatTime } from "@/lib/utils";
import { ProjectChart } from "@/components/ProjectChart";
import { MembersList } from "@/components/MembersList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const { id } = useParams();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const projectQuery = useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id),
  });

  if (projectQuery.status === "loading") return <h1>Loading...</h1>;
  if (projectQuery.status === "error") {
    return <h1>Something went wrong</h1>;
  }

  const project = projectQuery.data.project as Project;

  return (
    <div className="h-screen">
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
              <Button>
                <Pencil className="mr-2 h-4 w-4" /> Edit{" "}
                {!isMobile && "project"}
              </Button>
              <Button variant="outline-desctructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete{" "}
                {!isMobile && "project"}
              </Button>
            </div>
          </div>
        </div>
        <div className="grid gap-3 overflow-hidden rounded-lg lg:grid-cols-5 lg:overflow-y-scroll">
          {/* charts */}
          <div className="rounded-lg bg-white p-6 text-center dark:bg-gray-900 lg:col-span-3">
            <Tabs defaultValue="status">
              <div className="lg:flex lg:justify-between">
                <div className="pb-3 text-start lg:pb-0">
                  <h2 className="text-xl font-bold">Issues overview</h2>
                  <p className="pt-1 text-sm text-muted-foreground">
                    Total issues: 18
                  </p>
                </div>
                <TabsList className="text-end">
                  <TabsTrigger value="status">Status</TabsTrigger>
                  <TabsTrigger value="category">Category</TabsTrigger>
                  <TabsTrigger value="priority">Priority</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="status">
                Change your password here.
              </TabsContent>
              <TabsContent value="category">
                <ProjectChart />
              </TabsContent>
              <TabsContent value="priority">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
          {/* members */}
          <div className="h-fit rounded-lg bg-white p-6 dark:bg-gray-900 lg:col-span-2">
            <MembersList projectId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
