import { ProjectSheet } from "../components/ProjectSheet";
import { ProjectCard } from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  type Project,
  getProjects,
} from "@/features/projects/apis/project-api";
import { ScrollArea } from "@/components/ui/scroll-area";
import Spinner from "@/components/ui/spinner";

export function AllProjectsPage() {
  const { status, data } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    onError: (error) => console.log(error),
  });

  if (status === "loading") return <Spinner />;

  if (status === "error") {
    return <h1>Some errors occurred</h1>;
  }

  const projects = data.projects as Project[];

  return (
    <div className="min-h-[calc(100vh-60px)] lg:h-screen">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="items-end justify-between space-y-2 lg:flex">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            <p className="mt-2 text-muted-foreground">
              Here is s a list of your projects!
            </p>
          </div>
          <div className="pt-5">
            <ProjectSheet />
          </div>
        </div>
        <ScrollArea>
          <div className="grid grid-cols-1 gap-5 lg:auto-rows-[1fr] lg:grid-cols-3 2xl:grid-cols-4">
            {projects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
